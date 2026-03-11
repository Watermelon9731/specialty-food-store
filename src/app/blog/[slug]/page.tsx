import { client, urlFor } from "@/sanity/client";
import { SanityPost } from "@/types/sanity";
import { PATH } from "@/constants/path";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

async function getPost(slug: string): Promise<SanityPost | null> {
  const query = `
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      body,
      mainImage {
        asset->{
          _id,
          url
        }
      }
    }
  `;
  try {
    return await client.fetch(query, { slug });
  } catch (error) {
    console.error("Failed to fetch sanity post detail", error);
    return null;
  }
}

// Generate Static Params if we want ISR
export async function generateStaticParams() {
  const query = `*[_type == "post"] { slug }`;
  const posts = await client.fetch(query);
  return posts.map((post: any) => ({
    slug: post.slug.current,
  }));
}

// Setup custom serializers for PortableText
const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
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
            alt={value.alt || "Hình bài viết"}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-contain relative z-10"
          />
        </figure>
      );
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-[#3a7851] hover:underline font-semibold transition-all"
        >
          {children}
        </a>
      );
    },
  },
  block: {
    normal: ({ children }: any) => (
      <p className="text-slate-700 leading-relaxed mb-6 text-lg">{children}</p>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">
        {children}
      </h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-[#3a7851] bg-emerald-50/50 pl-6 py-4 pr-4 my-8 italic text-slate-700 rounded-r-2xl text-xl leading-relaxed">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc leading-relaxed text-slate-700 mb-6 pl-6 text-lg space-y-2">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal leading-relaxed text-slate-700 mb-6 pl-6 text-lg space-y-2">
        {children}
      </ol>
    ),
  },
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    return { title: "Không tìm thấy bài viết | Tré Bà Liên" };
  }
  return {
    title: `${post.title} | Tré Bà Liên`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

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
            <PortableText value={post.body} components={ptComponents} />
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
