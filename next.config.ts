import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/san-pham", destination: "/products" },
      { source: "/san-pham/:slug", destination: "/products/:slug" },
      { source: "/danh-muc", destination: "/categories" },
      { source: "/gioi-thieu", destination: "/about" },
      { source: "/lien-he", destination: "/contact" },
      { source: "/dieu-khoan", destination: "/terms" },
      { source: "/chinh-sach-bao-mat", destination: "/privacy" },
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
    ],
  },
};

export default nextConfig;
