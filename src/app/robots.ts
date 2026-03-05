import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ??
    "https://funny-marzipan-fc5122.netlify.app";

  return {
    rules: [
      {
        // All bots can crawl public pages
        userAgent: "*",
        allow: [
          "/",
          "/products",
          "/categories",
          "/about",
          "/contact",
          "/tre-binh-dinh",
        ],
        // Block admin panel and all API routes
        disallow: ["/admin", "/admin/", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
