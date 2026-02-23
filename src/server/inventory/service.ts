import { db } from "@/lib/db";

export const adjustInventory = async (
  productId: string,
  quantityChange: number,
  reason: string,
  batchNumber?: string,
  expiryDate?: Date,
) => {
  return await db.$transaction(async (tx) => {
    // Create log
    const log = await tx.inventoryLog.create({
      data: {
        productId,
        quantityChange,
        reason,
        batchNumber,
        expiryDate,
      },
    });

    // Update product stock
    await tx.product.update({
      where: { id: productId },
      data: {
        stockQuantity: { increment: quantityChange },
      },
    });

    return log;
  });
};
