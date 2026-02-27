import { db } from "@/lib/db";
import { type ProductInput } from "./schemas";

export const getProducts = async () => {
  const { data, error } = await db
    .from("Product")
    .select("*, category:Category(*)")
    .eq("isDeleted", false)
    .order("createdAt", { ascending: false });
  if (error) throw error;
  return data ?? [];
};

export const getProductBySku = async (sku: string) => {
  const { data, error } = await db
    .from("Product")
    .select("*, category:Category(*)")
    .eq("sku", sku)
    .single();
  if (error) return null;
  return data;
};

export const getProductBySlug = async (slug: string) => {
  const { data, error } = await db
    .from("Product")
    .select("*, category:Category(*)")
    .eq("slug", slug)
    .single();
  if (error) return null;
  return data;
};

export const createProduct = async (data: ProductInput) => {
  const { data: product, error } = await db
    .from("Product")
    .insert({
      ...data,
      stockQuantity: data.stockQuantity ?? 0,
      shelfLifeDays: data.shelfLifeDays ?? 0,
    })
    .select()
    .single();
  if (error) throw error;
  return product;
};
