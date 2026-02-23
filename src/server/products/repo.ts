import { db } from "@/lib/db";
import { type ProductInput } from "./schemas";

export const getProducts = async () => {
  return await db.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
};

export const getProductBySku = async (sku: string) => {
  const product = await db.product.findUnique({
    where: { sku },
    include: { category: true },
  });
  return product;
};

export const createProduct = async (data: ProductInput) => {
  return await db.product.create({
    data: {
      ...data,
      stockQuantity: data.stockQuantity ?? 0,
      shelfLifeDays: data.shelfLifeDays ?? 0,
    },
  });
};
