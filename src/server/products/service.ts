import {
  createProduct,
  getProductBySku,
  getProductBySlug,
  getProducts,
} from "./repo";
import { type ProductInput } from "./schemas";

export const getProductsService = async () => {
  return await getProducts();
};

export const getProductBySlugService = async (slug: string) => {
  return await getProductBySlug(slug);
};

export const getProductBySkuService = async (sku: string) => {
  return await getProductBySku(sku);
};

export const createProductService = async (data: ProductInput) => {
  return await createProduct(data);
};

export const checkStockService = async (
  sku: string,
  requestedQuantity: number,
) => {
  const product = await getProductBySku(sku);
  if (!product) return false;
  return product.stockQuantity >= requestedQuantity;
};
