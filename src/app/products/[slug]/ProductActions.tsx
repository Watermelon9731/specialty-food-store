"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Minus, Plus, Check } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

type ProductActionsProps = {
  product: {
    id: string;
    name: string;
    slug: string;
    pricePerUnit: number;
    unitType: string;
    stockQuantity: number;
    img: string | null;
  };
};

export function ProductActions({ product }: ProductActionsProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const handleDecrease = () => setQuantity((q) => Math.max(1, q - 1));
  const handleIncrease = () =>
    setQuantity((q) => Math.min(product.stockQuantity, q + 1));

  const handleAddToCart = () => {
    if (product.stockQuantity === 0) return;

    addItem({
      id: product.id,
      name: product.name,
      price: product.pricePerUnit,
      quantity,
      unitType: product.unitType,
      image: product.img || `/images/products/${product.id}.jpg`,
      stock: product.stockQuantity,
    });

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const isOutOfStock = product.stockQuantity === 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="font-semibold text-slate-700">Số lượng:</span>
        <div className="flex items-center border border-slate-200 rounded-full bg-white h-12 px-2 shadow-xs">
          <button
            onClick={handleDecrease}
            disabled={quantity <= 1 || isOutOfStock}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 disabled:opacity-50 transition-colors text-slate-600"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-12 text-center font-medium text-slate-800">
            {quantity}
          </span>
          <button
            onClick={handleIncrease}
            disabled={quantity >= product.stockQuantity || isOutOfStock}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 disabled:opacity-50 transition-colors text-slate-600"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <span className="text-sm text-slate-500">
          {product.stockQuantity > 0
            ? `(Còn ${product.stockQuantity} ${product.unitType})`
            : "(Hết hàng)"}
        </span>
      </div>

      <div className="flex gap-3 mt-2">
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`flex-1 h-14 rounded-full text-lg font-bold shadow-lg transition-all duration-300 ${
            justAdded
              ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/25"
              : "bg-[#3a7851] hover:bg-[#2f6342] shadow-[#3a7851]/25 hover:-translate-y-1 hover:shadow-xl"
          }`}
        >
          {justAdded ? (
            <span className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              Đã thêm {quantity} {product.unitType}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Thêm vào giỏ hàng
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
