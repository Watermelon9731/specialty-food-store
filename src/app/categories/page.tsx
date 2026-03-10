import Link from "next/link";
import { getCategoriesService } from "@/server/categories/service";
import { ArrowRight, Fish, ChefHat, Beef, Leaf, Package2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PATH } from "@/constants/path";
import Image from "next/image";

export const revalidate = 60;

export const metadata = {
  title: "Danh mục sản phẩm | Tré Bà Liên",
  description:
    "Từ đặc sản Tré, Nem, Chả đến hải sản biển Quy Nhơn tìm thứ bạn cần theo từng danh mục đặc sản.",
  alternates: {
    canonical: "/danh-muc",
  },
};

// Map category names to icons and colours (extend as needed)
const CATEGORY_META: Record<
  string,
  { icon: React.ReactNode; gradient: string; textColor: string; bg: string }
> = {
  default: {
    icon: <Package2 className="w-8 h-8" />,
    gradient: "from-slate-200 to-slate-300",
    textColor: "text-slate-700",
    bg: "bg-slate-100",
  },
  "hải sản": {
    icon: <Fish className="w-8 h-8" />,
    gradient: "from-blue-100 to-teal-200",
    textColor: "text-teal-800",
    bg: "bg-teal-50",
  },
  thịt: {
    icon: <Beef className="w-8 h-8" />,
    gradient: "from-orange-100 to-amber-200",
    textColor: "text-amber-800",
    bg: "bg-amber-50",
  },
  "nem chả": {
    icon: <ChefHat className="w-8 h-8" />,
    gradient: "from-red-100 to-rose-200",
    textColor: "text-rose-800",
    bg: "bg-rose-50",
  },
  "gia vị": {
    icon: <Leaf className="w-8 h-8" />,
    gradient: "from-emerald-100 to-green-200",
    textColor: "text-emerald-800",
    bg: "bg-emerald-50",
  },
};

function getCategoryMeta(name: string) {
  const lower = name.toLowerCase();
  for (const [key, val] of Object.entries(CATEGORY_META)) {
    if (key !== "default" && lower.includes(key)) return val;
  }
  return CATEGORY_META["default"];
}

export default async function CategoriesPage() {
  const categories = await getCategoriesService();

  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      {/* ── Page Hero ── */}
      <div className="bg-[#1a3d2b] text-white py-16 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
            <ChefHat className="w-4 h-4" />
            Tré Bà Liên
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Danh mục sản phẩm
          </h1>
          <p className="text-emerald-200/80 text-lg max-w-xl">
            Từ hải sản biển Quy Nhơn đến thịt gác bếp Tây Nguyên — tìm thứ bạn
            cần theo từng danh mục đặc sản.
          </p>
        </div>
      </div>

      {/* ── Category grid ── */}
      <div className="container mx-auto max-w-7xl px-4 md:px-6 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 rounded-full mb-3 px-4 py-1.5">
              {categories.length} danh mục
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Chọn danh mục phù hợp
            </h2>
          </div>
          <Link
            href={PATH.PRODUCTS.ALL}
            className="hidden sm:flex items-center gap-2 text-sm font-semibold text-[#3a7851] hover:text-[#1a3d2b] transition-colors group"
          >
            Xem tất cả sản phẩm
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">📦</p>
            <p className="text-xl font-semibold text-slate-600">
              Chưa có danh mục
            </p>
            <p className="text-slate-400 mt-2">Vui lòng quay lại sau.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            {categories.map((category, idx) => {
              const meta = getCategoryMeta(category.name);
              return (
                <Link
                  key={category.id}
                  href={PATH.PRODUCTS.CATEGORY(category.name.toLowerCase())}
                  className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-white border border-slate-100 hover:border-emerald-200 shadow-sm hover:shadow-xl hover:shadow-emerald-900/8 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Card image / color block */}
                  <div
                    className={`aspect-4/3 bg-linear-to-br ${meta.gradient} flex items-center justify-center relative overflow-hidden`}
                  >
                    {/* Decorative large icon behind */}
                    {category.image ? (
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    ) : (
                      <>
                        <div className="absolute opacity-10 scale-[3] pointer-events-none">
                          {meta.icon}
                        </div>
                        {/* Centered icon pill */}
                        <div
                          className={`${meta.bg} ${meta.textColor} rounded-2xl p-5 shadow-sm border border-white/60 group-hover:scale-110 transition-transform duration-300`}
                        >
                          {meta.icon}
                        </div>
                      </>
                    )}

                    {/* Number badge */}
                    <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs font-bold text-slate-700 shadow-sm">
                      #{String(idx + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="flex items-center justify-between p-5">
                    <div>
                      <h3
                        className={`text-lg font-bold ${meta.textColor} group-hover:text-[#1a3d2b] transition-colors leading-tight`}
                      >
                        {category.name}
                      </h3>
                      <p className="text-slate-400 text-xs mt-1 font-medium">
                        Khám phá sản phẩm
                      </p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-slate-100 group-hover:bg-[#1a3d2b] flex items-center justify-center text-slate-500 group-hover:text-white transition-all duration-200 shrink-0">
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              );
            })}

            {/* Promo card — "Xem tất cả" */}
            <Link
              href={PATH.PRODUCTS.ALL}
              className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-[#1a3d2b] border border-transparent hover:border-emerald-500/30 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-4/3 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-size-[20px_20px]" />
                <p className="text-5xl relative z-10">🛒</p>
              </div>
              <div className="flex items-center justify-between p-5">
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">
                    Tất cả sản phẩm
                  </h3>
                  <p className="text-emerald-400 text-xs mt-1 font-medium">
                    Xem toàn bộ
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full bg-emerald-700 group-hover:bg-white flex items-center justify-center text-white group-hover:text-[#1a3d2b] transition-all duration-200 shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
