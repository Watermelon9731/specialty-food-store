import type { PortableTextBlock } from "@portabletext/types";

export interface SanityPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  canonicalUrl?: string;
  noIndex?: boolean;
  _updatedAt?: string;
  mainImage?: {
    asset: {
      _ref: string;
      url: string;
    };
  };
  body?: PortableTextBlock[];
}
