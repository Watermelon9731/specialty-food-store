import { z } from "zod";

export const ProductSchema = z.object({
  sku: z.string().min(1, "SKU is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  pricePerUnit: z.coerce.number().min(0, "Price must be positive"),
  unitType: z.string().min(1, "Unit type is required"),
  stockQuantity: z.coerce.number().int().min(0, "Stock must be non-negative"),
  origin: z.string().min(1, "Origin is required"),
  shelfLifeDays: z.coerce.number().int().min(1, "Shelf life must be positive"),
  categoryId: z.string().min(1, "Category is required"),
});

export type ProductInput = z.infer<typeof ProductSchema>;
