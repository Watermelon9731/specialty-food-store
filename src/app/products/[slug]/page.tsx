import {
  getProductBySlugService,
  getProductsService,
} from "@/server/products/service";
import { notFound } from "next/navigation";
import { ProductActions } from "./ProductActions";
import { MapPin, ChefHat, ShieldCheck, Clock, Bookmark } from "lucide-react";
import Link from "next/link";
import { PATH } from "@/constants/path";
import { ProductGrid } from "@/components/product/ProductGrid";

export const dynamic = "force-dynamic";

function formatVND(amount: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const product = await getProductBySlugService((await params).slug);
  if (!product) notFound();

  // Fetch related products (e.g., from the same category)
  const allProducts = await getProductsService();
  const related = allProducts
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4)
    .map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      pricePerUnit: Number(p.pricePerUnit),
      unitType: p.unitType,
      stockQuantity: p.stockQuantity,
      origin: p.origin,
      img: p.img,
      note: p.note,
      category: p.category ? { name: p.category.name } : undefined,
    }));

  return (
    <div className="min-h-screen bg-[#f8f7f4] pt-12 pb-24 border-t border-slate-100">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-8 font-medium">
          <Link
            href={PATH.HOME}
            className="hover:text-[#3a7851] transition-colors"
          >
            Trang chủ
          </Link>
          <span className="text-slate-300">/</span>
          <Link
            href={PATH.PRODUCTS.ALL}
            className="hover:text-[#3a7851] transition-colors"
          >
            Sản phẩm
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-800 line-clamp-1">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-24">
          {/* Left: Image Container */}
          <div className="relative aspect-square w-full bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm group">
            <img
              src={product.img || undefined}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {product.note && (
              <span className="absolute top-6 left-6 z-10 bg-amber-500 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                {product.note}
              </span>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="flex flex-col">
            {product.category && (
              <div className="flex items-center gap-2 text-emerald-600 text-sm font-bold uppercase tracking-widest mb-4">
                <Bookmark className="w-4 h-4" />
                {product.category.name}
              </div>
            )}

            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-[1.15] mb-6">
              {product.name}
            </h1>

            <div className="flex items-end gap-3 mb-8">
              <span className="text-4xl font-extrabold text-[#3a7851]">
                {formatVND(Number(product.pricePerUnit))}
              </span>
              <span className="text-slate-500 text-lg mb-1 font-medium">
                / {product.unitType}
              </span>
            </div>

            <p className="text-slate-600 text-lg leading-relaxed mb-10 w-[90%]">
              {product.description ||
                "Đặc sản mang đậm hương vị truyền thống Xứ Nẫu, được chế tác từ công thức lâu năm của nghệ nhân với sự tỉ mỉ trong từng công đoạn."}
            </p>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="bg-white rounded-[1.25rem] p-4 flex items-center gap-4 shadow-sm border border-slate-100">
                <div className="bg-emerald-50 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                    Xuất xứ
                  </div>
                  <div className="font-semibold text-slate-800">
                    {product.origin}
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-[1.25rem] p-4 flex items-center gap-4 shadow-sm border border-slate-100">
                <div className="bg-emerald-50 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                    Hạn sử dụng
                  </div>
                  <div className="font-semibold text-slate-800">
                    {product.shelfLifeDays} ngày
                  </div>
                </div>
              </div>
            </div>

            {/* Add to Cart Actions */}
            <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100 mb-8">
              <ProductActions
                product={{
                  id: product.id,
                  name: product.name,
                  slug: product.slug,
                  pricePerUnit: Number(product.pricePerUnit),
                  unitType: product.unitType,
                  stockQuantity: product.stockQuantity,
                  img: product.img,
                }}
              />
            </div>

            {/* Reassurances */}
            <div className="flex items-center justify-start gap-8">
              <div className="flex items-center gap-2.5 text-sm font-medium text-slate-600">
                <div className="bg-emerald-100 rounded-full p-1">
                  <ChefHat className="w-4 h-4 text-emerald-700" />
                </div>
                Chuẩn vị truyền thống
              </div>
              <div className="flex items-center gap-2.5 text-sm font-medium text-slate-600">
                <div className="bg-emerald-100 rounded-full p-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                </div>
                Không chất bảo quản
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-10 text-slate-900 flex items-center gap-4">
              <span className="bg-[#3a7851] w-2 h-8 rounded-full"></span>
              Sản phẩm cùng loại
            </h2>
            <ProductGrid products={related} />
          </div>
        )}
      </div>
    </div>
  );
}
