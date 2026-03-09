import { db } from "@/lib/db";
import { type ProductInput } from "./schemas";

export const getProducts = async () => {
  const { data, error } = await db
    .from("Product")
    .select("*, ProductCategory(Category(*))")
    .eq("isDeleted", false)
    .order("createdAt", { ascending: false });
  if (error) throw error;
  return data ?? [];
};

export const getProductBySku = async (sku: string) => {
  const { data, error } = await db
    .from("Product")
    .select("*, ProductCategory(Category(*))")
    .eq("sku", sku)
    .single();
  if (error) return null;
  return data;
};

export const getProductBySlug = async (slug: string) => {
  const { data, error } = await db
    .from("Product")
    .select("*, ProductCategory(Category(*))")
    .eq("slug", slug)
    .single();
  if (error) return null;
  return data;
};

export const createProduct = async (data: ProductInput) => {
  const { categoryIds, ...productData } = data;

  const { data: product, error } = await db
    .from("Product")
    .insert({
      ...productData,
      stockQuantity: productData.stockQuantity ?? 0,
      shelfLifeDays: productData.shelfLifeDays ?? 0,
    })
    .select()
    .single();

  if (error) throw error;

  if (categoryIds && categoryIds.length > 0) {
    const categoryInserts = categoryIds.map((categoryId) => ({
      productId: product.id,
      categoryId,
    }));

    const { error: categoryError } = await db
      .from("ProductCategory")
      .insert(categoryInserts);

    if (categoryError) {
      console.error("Failed to associate categories:", categoryError);
    }
  }

  return product;
};
