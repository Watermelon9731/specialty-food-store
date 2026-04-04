import { client } from "@/sanity/client";
import type { SanityPost } from "@/types/sanity";

export type BlogSitemapItem = {
  slug: { current: string };
  publishedAt?: string;
  _updatedAt?: string;
};

const BLOG_REVALIDATE_SECONDS = 300;

const BLOG_LIST_QUERY = `
  *[
    _type == "post" &&
    defined(slug.current) &&
    !(_id in path("drafts.**")) &&
    (!defined(publishedAt) || publishedAt <= now())
  ] | order(coalesce(publishedAt, _createdAt) desc) {
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

const BLOG_DETAIL_QUERY = `
  *[
    _type == "post" &&
    slug.current == $slug &&
    !(_id in path("drafts.**")) &&
    (!defined(publishedAt) || publishedAt <= now())
  ][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    body,
    metaTitle,
    metaDescription,
    metaKeywords,
    canonicalUrl,
    noIndex,
    mainImage {
      asset->{
        _id,
        url
      }
    }
  }
`;

const BLOG_SLUGS_QUERY = `
  *[
    _type == "post" &&
    defined(slug.current) &&
    !(_id in path("drafts.**")) &&
    (!defined(publishedAt) || publishedAt <= now())
  ] | order(coalesce(publishedAt, _createdAt) desc) {
    slug
  }
`;

const BLOG_SITEMAP_QUERY = `
  *[
    _type == "post" &&
    defined(slug.current) &&
    !(_id in path("drafts.**")) &&
    (!defined(publishedAt) || publishedAt <= now())
  ] {
    slug,
    publishedAt,
    _updatedAt
  }
`;

export const getBlogPosts = async (): Promise<SanityPost[]> => {
  try {
    const posts = await client.fetch<SanityPost[]>(
      BLOG_LIST_QUERY,
      {},
      {
        next: {
          revalidate: BLOG_REVALIDATE_SECONDS,
          tags: ["sanity:blog", "sanity:blog:list"],
        },
      },
    );

    return posts ?? [];
  } catch (error) {
    console.error("[sanity-blog] Failed to fetch blog list", error);
    return [];
  }
};

export const getBlogPostBySlug = async (
  slug: string,
): Promise<SanityPost | null> => {
  if (!slug?.trim()) {
    return null;
  }

  try {
    const post = await client.fetch<SanityPost | null>(
      BLOG_DETAIL_QUERY,
      { slug },
      {
        next: {
          revalidate: BLOG_REVALIDATE_SECONDS,
          tags: ["sanity:blog", "sanity:blog:detail", `sanity:blog:${slug}`],
        },
        // Keep post detail strictly on published perspective for safe public SEO.
        perspective: "published",
      },
    );

    return post ?? null;
  } catch (error) {
    console.error(`[sanity-blog] Failed to fetch blog detail for slug="${slug}"`, error);
    return null;
  }
};

export const getBlogPostSlugs = async (): Promise<string[]> => {
  try {
    const posts = await client.fetch<Array<{ slug?: { current?: string } }>>(
      BLOG_SLUGS_QUERY,
      {},
      {
        next: {
          revalidate: BLOG_REVALIDATE_SECONDS,
          tags: ["sanity:blog", "sanity:blog:slugs"],
        },
      },
    );

    return (posts ?? [])
      .map((post) => post.slug?.current?.trim())
      .filter((slug): slug is string => Boolean(slug));
  } catch (error) {
    console.error("[sanity-blog] Failed to fetch blog slugs", error);
    return [];
  }
};

export const getBlogPostsForSitemap = async (): Promise<BlogSitemapItem[]> => {
  try {
    const posts = await client.fetch<BlogSitemapItem[]>(
      BLOG_SITEMAP_QUERY,
      {},
      {
        next: {
          revalidate: BLOG_REVALIDATE_SECONDS,
          tags: ["sanity:blog", "sanity:blog:sitemap"],
        },
      },
    );

    return posts ?? [];
  } catch (error) {
    console.error("[sanity-blog] Failed to fetch blog posts for sitemap", error);
    return [];
  }
};
