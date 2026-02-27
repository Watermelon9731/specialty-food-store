"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Star, MapPin, Check } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useState, useCallback } from "react";
import Image from "next/image";
import { PATH } from "@/constants/path";

type ProductProps = {
  id: string;
  slug: string;
  name: string;
  pricePerUnit: number;
  unitType: string;
  stockQuantity?: number;
  origin?: string | null;
  category?: { name: string };
  img?: string | null;
  note?: string | null;
};

function formatVND(amount: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

function ProductCard({
  product,
  index,
}: {
  product: ProductProps;
  index: number;
}) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const isLowStock =
    product.stockQuantity !== undefined &&
    product.stockQuantity <= 5 &&
    product.stockQuantity > 0;
  const isOutOfStock =
    product.stockQuantity !== undefined && product.stockQuantity === 0;

  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (isOutOfStock) return;

      addItem({
        id: product.id,
        name: product.name,
        price: product.pricePerUnit,
        quantity: 1,
        unitType: product.unitType,
        image: product.img || `/images/products/${product.id}.jpg`,
        stock: product.stockQuantity ?? 999,
      });

      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1500);
    },
    [addItem, product, isOutOfStock],
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: index * 0.09,
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex flex-col bg-white rounded-[1.75rem] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-emerald-900/8 border border-slate-100 hover:border-emerald-100 transition-all duration-400 hover:-translate-y-1"
    >
      {/* ── Image area ── */}
      <div className="relative aspect-square bg-[#f5f3ef] overflow-hidden">
        <Link
          href={PATH.PRODUCTS.DETAIL(product.slug)}
          className="absolute inset-0 z-10"
          aria-label={`Xem ${product.name}`}
        />

        {/* Placeholder / actual image */}
        <img
          src={product?.img || undefined}
          alt={product.name}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Top badges row */}
        <div className="absolute top-3 left-3 right-3 z-20 flex items-start justify-between gap-2 pointer-events-none">
          {product.category && (
            <span className="bg-white/90 backdrop-blur-sm text-emerald-800 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
              {product.category.name}
            </span>
          )}
          {isLowStock && (
            <span className="bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full shadow-sm">
              Sắp hết
            </span>
          )}
          {isOutOfStock && (
            <span className="bg-red-500 text-white text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full shadow-sm">
              Hết hàng
            </span>
          )}
        </div>

        {/* Quick-add button — slides up on hover */}
        {!isOutOfStock && (
          <div className="absolute bottom-0 left-0 right-0 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none group-hover:pointer-events-auto">
            <div className="p-3">
              <button
                className={`w-full backdrop-blur-md text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors duration-200 shadow-lg font-semibold text-sm ${
                  justAdded
                    ? "bg-emerald-500"
                    : "bg-[#1a3d2b]/90 hover:bg-[#3a7851]"
                }`}
                onClick={handleAddToCart}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    Đã thêm vào giỏ
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    Thêm vào giỏ
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Info area ── */}
      <div className="flex flex-col flex-1 p-4">
        {/* Origin tag */}
        {product.origin && (
          <div className="flex items-center gap-1 text-slate-400 text-xs mb-2">
            <MapPin className="w-3 h-3 shrink-0" />
            <span className="truncate">{product.origin}</span>
          </div>
        )}

        {/* Name */}
        <Link href={PATH.PRODUCTS.DETAIL(product.slug)}>
          <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-[#3a7851] transition-colors duration-200 line-clamp-2 mb-1">
            {product.name}
          </h3>
        </Link>
        {product.note && (
          <p className="text-xs text-amber-600 font-medium italic mb-2">
            {product.note}
          </p>
        )}

        {/* Rating row (decorative for now) */}
        <div className="flex items-center gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              className={`w-3.5 h-3.5 ${s <= 4 ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"}`}
            />
          ))}
          <span className="text-slate-400 text-xs ml-1">(4.8)</span>
        </div>

        {/* Price + unit */}
        <div className="mt-auto flex items-end justify-between gap-2">
          <div>
            <span className="text-xl font-bold text-[#3a7851]">
              {formatVND(product.pricePerUnit)}
            </span>
            <span className="text-slate-400 text-sm ml-1">
              / {product.unitType}
            </span>
          </div>
          {!isOutOfStock && (
            <button
              onClick={handleAddToCart}
              aria-label={`Thêm ${product.name} vào giỏ`}
              className={`h-8 w-8 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer shrink-0 ${
                justAdded
                  ? "bg-emerald-500 text-white scale-110"
                  : "bg-[#3a7851]/10 text-[#3a7851] hover:bg-[#3a7851] hover:text-white"
              }`}
            >
              <AnimatePresence mode="wait">
                {justAdded ? (
                  <motion.span
                    key="check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Check className="w-4 h-4" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="bag"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function ProductGrid({ products }: { products: ProductProps[] }) {
  if (products.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-5xl mb-4">🐟</p>
        <p className="text-xl font-semibold text-slate-600">Chưa có sản phẩm</p>
        <p className="text-slate-400 mt-2">Vui lòng quay lại sau.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}
