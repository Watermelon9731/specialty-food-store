import { client, urlFor } from "@/sanity/client";
import { SanityPost } from "@/types/sanity";
import { PATH } from "@/constants/path";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ChevronRight, PenTool } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const revalidate = 60; // Revalidate at most every 60 seconds

export const metadata = {
  title: "Tin Tức & Mẹo Vặt | Tré Bà Liên",
  description:
    "Cập nhật những thông tin mới nhất về ẩm thực Xứ Nẫu, mẹo vặt nấu ăn và câu chuyện bếp nhà từ Tré Bà Liên.",
};

async function getPosts(): Promise<SanityPost[]> {
  try {
    const query = `
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        publishedAt,
        excerpt,
        mainImage {
          asset->{
            _id,
            url
          }
        }
      }
    `;
    const posts = await client.fetch(query);
    return posts || [];
  } catch (error) {
    console.error("Failed to fetch posts from Sanity", error);
    return [];
  }
}

export default async function BlogIndexPage() {
  const posts = await getPosts();

  // Highlight the first post if any exists
  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-slate-800 pb-24">
      {/* ── HEADER TÌM KIẾM ── */}
      <section className="bg-[#1a3d2b] text-white pt-32 pb-20 px-4 md:px-6 relative overflow-hidden">
        {/* Soft abstract lighting */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-700/30 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
        <div className="container mx-auto max-w-5xl relative z-10">
          <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30 mb-6 rounded-full px-4 py-1.5 font-semibold tracking-wide">
            Chuyện Bếp Nhà
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Ẩm thực Xứ Nẫu &<br className="hidden md:block" />{" "}
            <span className="text-emerald-300">Nhịp Sống Quê Mình.</span>
          </h1>
          <p className="text-emerald-50/70 text-lg max-w-2xl leading-relaxed">
            Mẹo bếp thủ công, văn hóa ẩm thực và những mẩu chuyện mộc mạc làm
            nên thương hiệu Tré Bà Liên.
          </p>
        </div>
      </section>

      {/* ── DANH SÁCH BÀI VIẾT ── */}
      <main className="container mx-auto max-w-5xl px-4 md:px-6 -mt-10 relative z-20">
        {/* EMPTY STATE */}
        {posts.length === 0 && (
          <div className="bg-white rounded-3xl p-16 text-center shadow-lg border border-slate-100">
            <PenTool className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Chưa Có Bài Viết Nào
            </h2>
            <p className="text-slate-500">
              Chúng tôi đang chuẩn bị những câu chuyện thú vị gửi đến bạn. Hãy
              quay lại sau nhé!
            </p>
          </div>
        )}

        {/* BÀI VIẾT NỔI BẬT */}
        {featuredPost && (
          <Link
            href={PATH.BLOG.DETAIL(featuredPost.slug.current)}
            className="group block mb-12"
          >
            <article className="grid md:grid-cols-2 gap-0 bg-white rounded-[2.5rem] shadow-xl shadow-emerald-900/5 overflow-hidden border border-slate-100 transition-all duration-300 hover:shadow-2xl hover:border-emerald-200">
              <div className="relative aspect-video md:aspect-square md:h-full bg-[#f5f3ef] overflow-hidden">
                {featuredPost.mainImage?.asset?.url ? (
                  <Image
                    src={featuredPost.mainImage.asset.url}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    alt={featuredPost.title}
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-emerald-50 text-emerald-200 text-6xl select-none">
                    🌿
                  </div>
                )}
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-sm text-[#3a7851] font-semibold mb-4">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={featuredPost.publishedAt}>
                    {new Date(featuredPost.publishedAt).toLocaleDateString(
                      "vi-VN",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      },
                    )}
                  </time>
                  <span className="mx-2 text-slate-300">•</span>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs uppercase tracking-wider">
                    Bài Nổi Bật
                  </span>
                </div>
                <h2 className="text-2xl md:text-4xl font-bold text-slate-900 leading-tight mb-4 group-hover:text-[#3a7851] transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-slate-500 text-base md:text-lg mb-8 line-clamp-3 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="inline-flex items-center text-[#3a7851] font-bold text-sm uppercase tracking-widest mt-auto">
                  Đọc tiếp
                  <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </article>
          </Link>
        )}

        {/* LƯỚI BÀI VIẾT PHỤ */}
        {regularPosts.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {regularPosts.map((post) => (
              <Link
                key={post._id}
                href={PATH.BLOG.DETAIL(post.slug.current)}
                className="group block h-full"
              >
                <article className="flex flex-col h-full bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-emerald-900/5 hover:-translate-y-1 transition-all duration-300">
                  <div className="relative aspect-4/3 bg-[#f5f3ef] overflow-hidden">
                    {post.mainImage?.asset?.url ? (
                      <Image
                        src={post.mainImage.asset.url}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        alt={post.title}
                        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-emerald-50 text-emerald-200 text-5xl select-none">
                        🌿
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString(
                          "vi-VN",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          },
                        )}
                      </time>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#3a7851] transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed mb-6 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="inline-flex items-center text-[#3a7851] font-bold text-xs uppercase tracking-widest mt-auto">
                      Đọc tiếp
                      <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
