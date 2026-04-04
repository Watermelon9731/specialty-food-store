import { cache } from "react";
import {
  getBlogPostBySlug,
  getBlogPosts,
  getBlogPostsForSitemap,
  getBlogPostSlugs,
} from "./repo";

export const getBlogPostsService = cache(async () => {
  return await getBlogPosts();
});

export const getBlogPostBySlugService = cache(async (slug: string) => {
  return await getBlogPostBySlug(slug);
});

export const getBlogPostSlugsService = cache(async () => {
  return await getBlogPostSlugs();
});

export const getBlogPostsForSitemapService = cache(async () => {
  return await getBlogPostsForSitemap();
});
