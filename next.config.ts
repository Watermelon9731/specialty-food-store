import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/products", destination: "/san-pham", permanent: true },
      {
        source: "/products/:slug",
        destination: "/san-pham/:slug",
        permanent: true,
      },
      { source: "/categories", destination: "/danh-muc", permanent: true },
      { source: "/about", destination: "/gioi-thieu", permanent: true },
      { source: "/contact", destination: "/lien-he", permanent: true },
      { source: "/terms", destination: "/dieu-khoan", permanent: true },
      {
        source: "/privacy",
        destination: "/chinh-sach-bao-mat",
        permanent: true,
      },
      { source: "/blog", destination: "/tin-tuc", permanent: true },
      { source: "/blog/:slug", destination: "/tin-tuc/:slug", permanent: true },
    ];
  },
  async rewrites() {
    return [
      { source: "/san-pham", destination: "/products" },
      { source: "/san-pham/:slug", destination: "/products/:slug" },
      { source: "/danh-muc", destination: "/categories" },
      { source: "/gioi-thieu", destination: "/about" },
      { source: "/lien-he", destination: "/contact" },
      { source: "/dieu-khoan", destination: "/terms" },
      { source: "/chinh-sach-bao-mat", destination: "/privacy" },
      { source: "/tin-tuc", destination: "/blog" },
      { source: "/tin-tuc/:slug", destination: "/blog/:slug" },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oepinbezzuykjqxxdrzn.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
