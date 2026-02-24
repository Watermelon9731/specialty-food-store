import { PATH } from "@/constants/path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: PATH.PRODUCTS,
        destination: "/products",
      },
      {
        source: PATH.CATEGORIES,
        destination: "/categories",
      },
      {
        source: PATH.ABOUT,
        destination: "/about",
      },
      {
        source: PATH.CONTACT,
        destination: "/contact",
      },
      {
        source: PATH.TERMS,
        destination: "/terms",
      },
      {
        source: PATH.PRIVACY,
        destination: "/privacy",
      },
    ];
  },
};

export default nextConfig;
