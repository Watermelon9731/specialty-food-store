import { getProductsService } from "@/server/products/service";
import { getCategoriesService } from "@/server/categories/service";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Badge } from "@/components/ui/badge";
import { Suspense } from "react";
import { Waves, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string; q?: string };
}) {
  const [allProducts, categories] = await Promise.all([
    getProductsService(),
    getCategoriesService(),
  ]);

  // ── Filter logic ──────────────────────────────────
  const activeCategory = searchParams.category ?? "all";
  const searchQuery = searchParams.q?.toLowerCase() ?? "";

  const filteredProducts = allProducts.filter((p) => {
    const matchCat =
      activeCategory === "all" ||
      p.category?.name.toLowerCase() === activeCategory.toLowerCase();
    const matchQ = !searchQuery || p.name.toLowerCase().includes(searchQuery);
    return matchCat && matchQ;
  });

  const formatted = filteredProducts.map((p) => ({
    id: p.id,
    name: p.name,
    pricePerUnit: Number(p.pricePerUnit),
    unitType: p.unitType,
    stockQuantity: p.stockQuantity,
    origin: p.origin,
    category: p.category ? { name: p.category.name } : undefined,
  }));

  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      {/* ── Page hero ── */}
      <div className="bg-[#1a3d2b] text-white py-16 px-4 md:px-6 relative overflow-hidden">
        {/* Dot texture */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Waves className="w-4 h-4" />
            Vị Chờ
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Tất cả sản phẩm
          </h1>
          <p className="text-emerald-200/80 text-lg max-w-xl">
            Khám phá đầy đủ bộ sưu tập đặc sản thủ công từ vùng đất Xứ Nẫu — tré
            rơm, mực khô, nem chả và gia vị truyền thống.
          </p>
        </div>
      </div>

      {/* ── Sticky filter bar ── */}
      <div className="sticky top-[68px] z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 py-3 flex items-center gap-3 overflow-x-auto no-scrollbar">
          <SlidersHorizontal className="w-4 h-4 text-slate-500 shrink-0" />
          <Link
            href="/products"
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-150 ${
              activeCategory === "all"
                ? "bg-[#1a3d2b] text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-[#1a3d2b]"
            }`}
          >
            Tất cả
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.name.toLowerCase()}`}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-150 ${
                activeCategory === cat.name.toLowerCase()
                  ? "bg-[#1a3d2b] text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-[#1a3d2b]"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Results ── */}
      <div className="container mx-auto max-w-7xl px-4 md:px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-slate-900">
              {activeCategory === "all" ? "Tất cả sản phẩm" : activeCategory}
            </h2>
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 rounded-full font-semibold">
              {formatted.length} món
            </Badge>
          </div>
        </div>

        <Suspense
          fallback={
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-[1.75rem] bg-slate-100 animate-pulse"
                />
              ))}
            </div>
          }
        >
          <ProductGrid products={formatted} />
        </Suspense>
      </div>
    </div>
  );
}
