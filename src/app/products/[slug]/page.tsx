import {
  getProductBySlugService,
  getRelatedProductsByCategoryService,
} from "@/server/products/service";
import { notFound } from "next/navigation";
import { ProductActions } from "./ProductActions";
import { MapPin, ChefHat, ShieldCheck, Clock, Bookmark } from "lucide-react";
import Link from "next/link";
import { PATH } from "@/constants/path";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductGallery } from "./ProductGallery";

import type { Metadata } from "next";

export const revalidate = 60;

function formatVND(amount: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProductBySlugService(resolvedParams.slug);

  if (!product) {
    return {
      title: "Sản phẩm không tìm thấy | Tré Bà Liên",
    };
  }

  return {
    title: `${product.name} | Tré Bà Liên`,
    description:
      product.description || "Đặc sản mang đậm hương vị truyền thống Xứ Nẫu.",
    alternates: {
      canonical: `/san-pham/${resolvedParams.slug}`,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const product = await getProductBySlugService((await params).slug);
  if (!product) notFound();

  const firstCategoryId = product.ProductCategory?.[0]?.Category?.id;
  const relatedProducts = firstCategoryId
    ? await getRelatedProductsByCategoryService(firstCategoryId, product.id, 4)
    : [];
  const related = relatedProducts
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
      category: p.ProductCategory?.[0]?.Category
        ? { name: p.ProductCategory[0].Category.name }
        : undefined,
    }));

  return (
    <div className="min-h-screen bg-[#f8f7f4] pt-8 max-[375px]:pt-6 md:pt-12 pb-20 max-[375px]:pb-16 md:pb-24 border-t border-slate-100">
      <div className="container mx-auto max-w-6xl px-4 max-[375px]:px-3 md:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm max-[375px]:text-xs text-slate-500 mb-8 max-[375px]:mb-6 font-medium">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-[375px]:gap-8 lg:gap-16 items-start mb-24 max-[375px]:mb-16">
          {/* Left: Image Gallery */}
          <div className="w-full">
            <ProductGallery
              img={product.img}
              images={product.images}
              name={product.name}
              note={product.note}
            />
          </div>

          {/* Right: Product Details */}
          <div className="flex flex-col">
            {product.ProductCategory?.[0]?.Category && (
              <div className="flex items-center gap-2 text-emerald-600 text-sm font-bold uppercase tracking-widest mb-4">
                <Bookmark className="w-4 h-4" />
                {product.ProductCategory[0].Category.name}
              </div>
            )}

            <h1 className="text-3xl max-[375px]:text-2xl md:text-5xl font-bold text-slate-900 leading-[1.15] mb-6 max-[375px]:mb-4">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-end gap-2.5 md:gap-3 mb-4 max-[375px]:mb-3">
              {product.isMarketPrice ? (
                <span className="text-2xl max-[375px]:text-xl md:text-4xl font-extrabold text-amber-600">
                  Liên hệ để có giá tốt nhất
                </span>
              ) : (
                <>
                  <span className="text-3xl max-[375px]:text-2xl md:text-4xl font-extrabold text-[#3a7851]">
                    {formatVND(Number(product.pricePerUnit))}
                  </span>
                  <span className="text-slate-500 text-base max-[375px]:text-sm md:text-lg mb-1 font-medium">
                    / {product.unitType}
                  </span>
                </>
              )}
            </div>

            {product.isMarketPrice && (
              <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 mb-8 flex items-start gap-3">
                <span className="text-xl">💡</span>
                <p className="text-sm text-amber-800 leading-relaxed font-medium">
                  Sản phẩm này đang được bán theo thời giá. Xin vui lòng liên hệ
                  trực tiếp để có giá tốt nhất. Chúng tôi cam kết hải sản tươi
                  mới mỗi ngày, không bán hàng cấp đông dài ngày nhằm đảm bảo
                  chất lượng tuyệt đối cho bữa ăn của bạn!
                </p>
              </div>
            )}

            <p className="text-slate-600 text-base max-[375px]:text-sm md:text-lg leading-relaxed mb-8 max-[375px]:mb-6 md:mb-10 w-full md:w-[90%]">
              {product.description ||
                "Đặc sản mang đậm hương vị truyền thống Xứ Nẫu, được chế tác từ công thức lâu năm của nghệ nhân với sự tỉ mỉ trong từng công đoạn."}
            </p>

            {/* Quick Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 max-[375px]:mb-6 md:mb-10">
              <div className="bg-white rounded-[1.25rem] max-[375px]:rounded-xl p-4 max-[375px]:p-3 flex items-center gap-4 max-[375px]:gap-3 shadow-sm border border-slate-100">
                <div className="bg-emerald-50 w-12 h-12 max-[375px]:w-10 max-[375px]:h-10 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 max-[375px]:w-4 max-[375px]:h-4 text-emerald-600" />
                </div>
                <div>
                  <div className="text-[11px] max-[375px]:text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                    Xuất xứ
                  </div>
                  <div className="font-semibold text-slate-800 max-[375px]:text-sm">
                    {product.origin}
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-[1.25rem] max-[375px]:rounded-xl p-4 max-[375px]:p-3 flex items-center gap-4 max-[375px]:gap-3 shadow-sm border border-slate-100">
                <div className="bg-emerald-50 w-12 h-12 max-[375px]:w-10 max-[375px]:h-10 rounded-full flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 max-[375px]:w-4 max-[375px]:h-4 text-emerald-600" />
                </div>
                <div>
                  <div className="text-[11px] max-[375px]:text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                    Hạn sử dụng
                  </div>
                  <div className="font-semibold text-slate-800 max-[375px]:text-sm">
                    {product.shelfLifeDays} ngày
                  </div>
                </div>
              </div>
            </div>

            {/* Add to Cart Actions */}
            <div className="bg-white rounded-[1.5rem] max-[375px]:rounded-[1.25rem] p-4 max-[375px]:p-3.5 sm:p-6 shadow-sm border border-slate-100 mb-8">
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
            <div className="flex flex-wrap items-center justify-start gap-4 max-[375px]:gap-3 sm:gap-8">
              <div className="flex items-center gap-2.5 text-sm max-[375px]:text-xs font-medium text-slate-600">
                <div className="bg-emerald-100 rounded-full p-1">
                  <ChefHat className="w-4 h-4 text-emerald-700" />
                </div>
                Chuẩn vị truyền thống
              </div>
              <div className="flex items-center gap-2.5 text-sm max-[375px]:text-xs font-medium text-slate-600">
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
          <div className="mt-20 max-[375px]:mt-14">
            <h2 className="text-3xl max-[375px]:text-2xl font-bold mb-10 max-[375px]:mb-6 text-slate-900 flex items-center gap-4">
              <span className="bg-[#3a7851] w-2 max-[375px]:w-1.5 h-8 max-[375px]:h-6 rounded-full"></span>
              Sản phẩm cùng loại
            </h2>
            <ProductGrid products={related} />
          </div>
        )}
      </div>
    </div>
  );
}
