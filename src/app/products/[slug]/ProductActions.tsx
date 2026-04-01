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
    isMarketPrice?: boolean | null;
  };
};

export function ProductActions({ product }: ProductActionsProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const isMarketPrice =
    Boolean(product.isMarketPrice) || Number(product.pricePerUnit) < 1000;

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

  if (isMarketPrice) {
    return (
      <div className="flex flex-col gap-4 mt-2">
        <a
          href="/lien-he"
          className="flex-1 h-12 max-[375px]:h-11 sm:h-14 rounded-full text-base max-[375px]:text-sm sm:text-lg font-bold shadow-lg transition-all duration-300 bg-amber-500 hover:bg-amber-600 shadow-amber-500/25 flex items-center justify-center text-white"
        >
          <span className="flex items-center gap-2">Liên hệ đặt hàng ngay</span>
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3 max-[375px]:gap-2.5 sm:gap-4">
        <span className="font-semibold text-slate-700 max-[375px]:text-sm">Số lượng:</span>
        <div className="flex items-center border border-slate-200 rounded-full bg-white h-11 max-[375px]:h-10 sm:h-12 px-2 shadow-xs">
          <button
            onClick={handleDecrease}
            disabled={quantity <= 1 || isOutOfStock}
            className="w-8 h-8 max-[375px]:w-7 max-[375px]:h-7 rounded-full flex items-center justify-center hover:bg-slate-100 disabled:opacity-50 transition-colors text-slate-600"
          >
            <Minus className="w-4 h-4 max-[375px]:w-3.5 max-[375px]:h-3.5" />
          </button>
          <span className="w-12 max-[375px]:w-10 text-center font-medium text-slate-800 max-[375px]:text-sm">
            {quantity}
          </span>
          <button
            onClick={handleIncrease}
            disabled={quantity >= product.stockQuantity || isOutOfStock}
            className="w-8 h-8 max-[375px]:w-7 max-[375px]:h-7 rounded-full flex items-center justify-center hover:bg-slate-100 disabled:opacity-50 transition-colors text-slate-600"
          >
            <Plus className="w-4 h-4 max-[375px]:w-3.5 max-[375px]:h-3.5" />
          </button>
        </div>
        <span className="text-xs max-[375px]:text-[11px] sm:text-sm text-slate-500 w-full sm:w-auto">
          {product.stockQuantity > 0
            ? `(Còn ${product.stockQuantity} ${product.unitType})`
            : "(Hết hàng)"}
        </span>
      </div>

      <div className="flex gap-3 mt-2">
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`flex-1 w-full h-12 max-[375px]:h-11 sm:h-14 rounded-full text-base max-[375px]:text-sm sm:text-lg font-bold shadow-lg transition-all duration-300 ${
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
