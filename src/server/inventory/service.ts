import { db } from "@/lib/db";

export const adjustInventory = async (
  productId: string,
  quantityChange: number,
  reason: string,
  batchNumber?: string,
  expiryDate?: Date,
) => {
  // Create inventory log
  const { data: log, error: logError } = await db
    .from("InventoryLog")
    .insert({
      productId,
      quantityChange,
      reason,
      batchNumber,
      expiryDate: expiryDate?.toISOString(),
    })
    .select()
    .single();
  if (logError) throw logError;

  // Fetch current stock and increment
  const { data: product, error: fetchError } = await db
    .from("Product")
    .select("stockQuantity")
    .eq("id", productId)
    .single();
  if (fetchError) throw fetchError;

  const { error: updateError } = await db
    .from("Product")
    .update({ stockQuantity: (product.stockQuantity ?? 0) + quantityChange })
    .eq("id", productId);
  if (updateError) throw updateError;

  return log;
};
