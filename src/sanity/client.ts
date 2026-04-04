import { createClient } from "next-sanity";
import imageUrlBuilder, { type SanityImageSource } from "@sanity/image-url";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "demo_id"; // Replace with your sanity projectId
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2024-03-11";
const useCdn = process.env.NEXT_PUBLIC_SANITY_USE_CDN !== "false";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Enable APICDN by default to absorb repeated anonymous reads.
  useCdn,
  perspective: "published",
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
