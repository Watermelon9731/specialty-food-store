import type { MetadataRoute } from "next";
import { getProductsService } from "@/server/products/service";
import { client } from "@/sanity/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://trebinhdinh.com";

  // Static public routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tre-binh-dinh`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/san-pham`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/danh-muc`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gioi-thieu`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/lien-he`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/dieu-khoan`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/chinh-sach-bao-mat`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/tin-tuc`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
  ];

  // NOTE: Admin routes (/admin, /admin/orders, /admin/login, etc.)
  // are intentionally excluded — they are blocked in robots.ts as well.

  try {
    const products = await getProductsService();

    const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
      url: `${baseUrl}/san-pham/${product.slug}`,
      lastModified: new Date(
        product.updatedAt || product.createdAt || new Date(),
      ),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    // Fetch Blog Posts from Sanity
    const query = `*[_type == "post"] { slug, publishedAt, _updatedAt }`;
    const posts = await client.fetch(query);
    const postRoutes: MetadataRoute.Sitemap = posts.map((post: any) => ({
      url: `${baseUrl}/tin-tuc/${post.slug.current}`,
      lastModified: new Date(post._updatedAt || post.publishedAt || new Date()),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    return [...staticRoutes, ...productRoutes, ...postRoutes];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return staticRoutes;
  }
}
