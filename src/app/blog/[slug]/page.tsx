import { urlFor } from "@/sanity/client";
import { SanityPost } from "@/types/sanity";
import { PATH } from "@/constants/path";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import {
  getBlogPostBySlugService,
  getBlogPostSlugsService,
} from "@/server/blog/service";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const revalidate = 300;

type Props = {
  params: Promise<{ slug: string }>;
};
type PortableImageValue = {
  asset?: { _ref?: string };
  alt?: string;
  caption?: string;
};
type PortableLinkValue = {
  href?: string;
};
type PortableChildrenProps = {
  children?: ReactNode;
};
const BLOG_DETAIL_DESCRIPTION =
  "Bài viết chia sẻ mẹo dùng đặc sản Bình Định và kinh nghiệm chọn mua thực phẩm thủ công an toàn.";

function resolveCanonicalUrl(slug: string, canonicalUrl?: string) {
  if (!canonicalUrl?.trim()) {
    return `/tin-tuc/${slug}`;
  }

  const normalized = canonicalUrl.trim();
  if (normalized.startsWith("http://") || normalized.startsWith("https://")) {
    return normalized;
  }

  return normalized.startsWith("/") ? normalized : `/${normalized}`;
}

// Generate Static Params if we want ISR
export async function generateStaticParams() {
  const slugs = await getBlogPostSlugsService();
  return slugs.map((slug) => ({
    slug,
  }));
}

function getPortableTextComponents(postTitle: string) {
  return {
    types: {
      image: ({ value }: { value?: PortableImageValue }) => {
        if (!value?.asset?._ref) {
          return null;
        }
        const rawAlt = value?.alt?.trim();
        const isGenericAlt =
          !rawAlt || /^(image|hình bài viết|hinh bai viet)$/i.test(rawAlt);
        const imageAlt =
          (!isGenericAlt && rawAlt) ||
          value?.caption?.trim() ||
          `Hình minh họa đặc sản Bình Định trong bài ${postTitle}`;

        return (
          <figure className="my-8 mx-auto text-center rounded-2xl overflow-hidden shadow-sm relative w-full h-[300px] sm:h-[450px] bg-slate-100 ring-1 ring-slate-100">
            {/* Blurred Background Layer for Non-fitting Images */}
            <div className="absolute inset-0 opacity-40">
              <Image
                src={urlFor(value).url()}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover blur-2xl scale-110"
              />
            </div>

            {/* Main Crisp Image on Top */}
            <Image
              src={urlFor(value).url()}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-contain relative z-10"
            />
          </figure>
        );
      },
    },
    marks: {
      link: ({
        children,
        value,
      }: PortableChildrenProps & { value?: PortableLinkValue }) => {
        const href = value?.href || "";
        if (!href) {
          return <>{children}</>;
        }

        const rel = !href.startsWith("/")
          ? "noreferrer noopener"
          : undefined;
        return (
          <a
            href={href}
            rel={rel}
            className="text-[#3a7851] hover:underline font-semibold transition-all"
          >
            {children}
          </a>
        );
      },
    },
    block: {
      normal: ({ children }: PortableChildrenProps) => (
        <p className="text-slate-700 leading-relaxed mb-6 text-lg">{children}</p>
      ),
      h2: ({ children }: PortableChildrenProps) => (
        <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
          {children}
        </h2>
      ),
      h3: ({ children }: PortableChildrenProps) => (
        <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">
          {children}
        </h3>
      ),
      blockquote: ({ children }: PortableChildrenProps) => (
        <blockquote className="border-l-4 border-[#3a7851] bg-emerald-50/50 pl-6 py-4 pr-4 my-8 italic text-slate-700 rounded-r-2xl text-xl leading-relaxed">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }: PortableChildrenProps) => (
        <ul className="list-disc leading-relaxed text-slate-700 mb-6 pl-6 text-lg space-y-2">
          {children}
        </ul>
      ),
      number: ({ children }: PortableChildrenProps) => (
        <ol className="list-decimal leading-relaxed text-slate-700 mb-6 pl-6 text-lg space-y-2">
          {children}
        </ol>
      ),
    },
  };
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlugService(slug);
  if (!post) {
    return {
      title: "Không tìm thấy bài viết",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt || BLOG_DETAIL_DESCRIPTION;
  const canonical = resolveCanonicalUrl(slug, post.canonicalUrl);
  const shouldNoIndex = Boolean(post.noIndex);
  const imageUrl = post.mainImage?.asset?.url;

  return {
    title,
    description,
    keywords: post.metaKeywords?.length ? post.metaKeywords : undefined,
    alternates: {
      canonical,
    },
    robots: shouldNoIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : undefined,
    openGraph: {
      title,
      description,
      type: "article",
      url: canonical,
      publishedTime: post.publishedAt,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: post.title,
            },
          ]
        : undefined,
    },
  } satisfies Metadata;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post: SanityPost | null = await getBlogPostBySlugService(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f8f7f4] pb-24 text-slate-800">
      {/* ── HEADER BÀI VIẾT ── */}
      <section className="bg-white pt-32 pb-16 px-4 md:px-6 relative border-b border-slate-200">
        <div className="container mx-auto max-w-3xl relative z-10 text-center">
          <Link
            href={PATH.BLOG.ALL}
            className="inline-flex items-center text-[#3a7851] font-bold text-sm uppercase tracking-widest mb-10 hover:-translate-x-1 transition-transform"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Về trang tin tức
          </Link>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-slate-900">
            {post.title}
          </h1>

          <div className="flex items-center justify-center gap-2 text-sm text-slate-500 font-medium mb-8">
            <Calendar className="w-4 h-4 text-[#3a7851]" />
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("vi-VN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </div>
        </div>
      </section>

      {/* ── NỘI DUNG CHÍNH ── */}
      <main className="container mx-auto max-w-3xl px-4 md:px-6 mt-16">
        {/* Cover Image */}
        {post.mainImage?.asset?.url && (
          <div className="relative w-full aspect-21/9 bg-[#f5f3ef] rounded-[2.5rem] overflow-hidden shadow-xl mb-16 border border-slate-100">
            <Image
              src={post.mainImage.asset.url}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              priority
              alt={post.title}
              className="object-cover"
            />
          </div>
        )}

        {/* Portable Text Content */}
        <article className="prose prose-lg prose-emerald max-w-none">
          {post.body ? (
            <PortableText
              value={post.body}
              components={getPortableTextComponents(post.title)}
            />
          ) : (
            <div className="text-center text-slate-500 py-12">
              Nội dung bài viết đang được cập nhật...
            </div>
          )}
        </article>

        {/* Footer Navigation or CTA */}
        <div className="mt-20 pt-10 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link href={PATH.BLOG.ALL}>
            <button className="px-6 py-3 rounded-full bg-slate-100 text-slate-600 hover:bg-[#3a7851] hover:text-white font-bold text-sm transition-colors">
              Đọc thêm bài khác
            </button>
          </Link>
          <Link href={PATH.PRODUCTS.ALL}>
            <button className="px-6 py-3 rounded-full bg-[#3a7851] text-white hover:bg-[#2f6342] font-bold text-sm transition-colors shadow-lg shadow-emerald-900/20">
              Khám phá Đặc Sản
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
