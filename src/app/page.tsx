import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getProductsService } from "@/server/products/service";
import {
  Leaf,
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  ChefHat,
  Search,
  PackageCheck,
  Truck,
  CheckCircle2,
  MapPin,
  Quote,
  Facebook,
  Mail,
} from "lucide-react";
import { PATH, CONTACT_INFO } from "@/constants/path";
import Image from "next/image";
import ZaloIcon from "@/components/icons/ZaloIcon";

export const revalidate = 60;

export default async function Home() {
  const products = await getProductsService();

  const featuredProducts = products
    .filter((p) => p.isFeatured)
    .map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      pricePerUnit: Number(p.pricePerUnit),
      unitType: p.unitType,
      stockQuantity: p.stockQuantity,
      origin: p.origin,
      category: p.ProductCategory?.[0]?.Category
        ? { name: p.ProductCategory[0].Category.name }
        : undefined,
      note: p.note,
      img: p.img,
    }));

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f7f4] text-slate-800 overflow-hidden selection:bg-emerald-200">
      {/* ═══════════════════════════════════════
          1. HERO — Full-width, editorial style
          ═══════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex items-center px-4 md:px-6 overflow-hidden bg-[#f8f7f4]">
        {/* Warm dot-grid texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#d6d3c8_1px,transparent_1px)] bg-size-[28px_28px] opacity-60 pointer-events-none" />

        {/* Ambient blobs */}
        <div className="absolute top-1/4 right-0 w-[720px] h-[720px] bg-emerald-100/50 rounded-full blur-[120px] translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-50/60 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="container mx-auto max-w-7xl relative z-10 grid md:grid-cols-2 gap-12 items-center py-24 md:py-0">
          {/* Left — copy */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-emerald-200/60 rounded-full px-4 py-2 mb-8 shadow-sm">
              <MapPin className="w-4 h-4 text-[#3a7851]" />
              <span className="text-sm font-semibold text-[#3a7851]">
                Đặc sản Bình Định · Xứ Nẫu
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.08] mb-6">
              Vị ngon{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#3a7851]">quê nhà</span>
                {/* Hand-drawn underline effect */}
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                >
                  <path
                    d="M2 8 C 40 2, 100 10, 198 6"
                    stroke="#3a7851"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                </svg>
              </span>
              <br />
              theo từng mùa.
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
              Tré rơm, nem chả, mực một nắng — mỗi thức quà đều được làm thủ
              công, không chất bảo quản, giữ trọn tinh túy của vùng đất{" "}
              <strong className="text-slate-800 font-semibold">Xứ Nẫu</strong>{" "}
              qua bao thế hệ.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href={PATH.PRODUCTS.ALL}>
                <Button
                  size="lg"
                  className="h-14 px-8 rounded-full bg-[#3a7851] hover:bg-[#2f6342] text-white text-base font-semibold shadow-lg shadow-[#3a7851]/25 hover:-translate-y-0.5 transition-all duration-200"
                >
                  Khám phá sản phẩm
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href={PATH.ABOUT}>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 rounded-full border-slate-300 text-slate-700 hover:bg-white hover:border-[#3a7851] hover:text-[#3a7851] text-base font-semibold transition-all duration-200 bg-white/60 backdrop-blur-sm"
                >
                  Câu chuyện bếp nhà
                </Button>
              </Link>
            </div>

            {/* Social proof strip */}
            <div className="flex items-center gap-6 mt-12 pt-8 border-t border-slate-200/60 w-full">
              {[
                { value: "Đam mê", label: "Từ tâm huyết" },
                { value: "100%", label: "Thủ công" },
                { value: "Toàn quốc", label: "Giao hỏa tốc" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-[#3a7851]">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-500 font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — hero image collage */}
          <div className="relative hidden md:flex items-center justify-center">
            {/* Main image placeholder - tall portrait */}
            <div className="w-[340px] h-[460px] bg-linear-to-br from-emerald-100 to-teal-200 rounded-[2.5rem] shadow-2xl shadow-emerald-900/15 overflow-hidden flex items-end justify-center relative">
              <Image
                src={
                  "https://oepinbezzuykjqxxdrzn.supabase.co/storage/v1/object/public/tre-ba-lien/tre-ruot.jpg"
                }
                fill
                alt="Tré Bà Liên"
                className="object-cover"
              />
            </div>

            {/* Secondary image — offset */}
            <div className="absolute top-10 -right-6 w-[180px] h-[220px] bg-linear-to-br from-amber-50 to-orange-100 rounded-[1.5rem] shadow-xl overflow-hidden flex items-end justify-center border-4 border-white">
              <Image
                src={
                  "https://oepinbezzuykjqxxdrzn.supabase.co/storage/v1/object/public/tre-ba-lien/cha-ram-tom-dat.jpg"
                }
                fill
                alt="Chả ram tôm đất"
                className="object-cover"
              />
              <div className="text-center pb-6 relative z-10">
                <p className="text-amber-900 font-bold text-md px-2 py-1 bg-white rounded-full">
                  Chả ram tôm đất
                </p>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-2 -left-8 bg-white rounded-2xl p-4 shadow-xl border border-slate-100 flex items-center gap-3">
              <div className="h-10 w-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-[#3a7851]" />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">
                  Giao toàn quốc
                </p>
                <p className="text-slate-500 text-xs">Tốc hành 2–3 ngày</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          2. COMMITMENTS — Icon cards, staggered
          ═══════════════════════════════════════ */}
      <section className="py-24 bg-white px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 mb-4 rounded-full px-4 py-1.5">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                Triết lý của chúng tôi
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                Cam kết khắt khe,
                <br />
                không thỏa hiệp.
              </h2>
            </div>
            <p className="text-slate-500 max-w-sm text-base md:text-right leading-relaxed">
              Sức khoẻ của gia đình bạn là tiêu chuẩn không thể đánh đổi tại lò
              của chúng tôi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Leaf className="h-6 w-6" />,
                color: "emerald",
                title: "100% Tự Nhiên",
                desc: "Lên men bằng lá ổi, rơm rạ. Tuyệt đối không sử dụng hàn the hay chất bảo quản công nghiệp trong bất kỳ sản phẩm nào.",
                offset: false,
              },
              {
                icon: <ShieldCheck className="h-6 w-6" />,
                color: "teal",
                title: "Minh Bạch Nguồn Gốc",
                desc: "Kiểm soát từ khâu tuyển chọn thịt heo nóng tại lò mổ địa phương lúc rạng sáng, đến khi sản phẩm đến tay bạn.",
                offset: true,
              },
              {
                icon: <HeartHandshake className="h-6 w-6" />,
                color: "emerald",
                title: "Tôn Vinh Nghề Cũ",
                desc: "Giữ gìn công thức gia truyền và đôi bàn tay khéo léo của các nghệ nhân, đặt tình yêu nghề lên hàng đầu.",
                offset: false,
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`group bg-slate-50 hover:bg-white border border-slate-100 hover:border-emerald-200 rounded-[2rem] p-8 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/5 hover:-translate-y-1 ${item.offset ? "md:mt-8" : ""}`}
              >
                <div
                  className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-6 text-${item.color}-600 bg-${item.color}-50 border border-${item.color}-100 group-hover:bg-${item.color}-600 group-hover:text-white group-hover:border-transparent transition-all duration-300`}
                >
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          3. STORY — Dark green editorial block
          ═══════════════════════════════════════ */}
      <section className="bg-[#1a3d2b] text-white py-24 overflow-hidden relative">
        {/* Decorative large leaf outline */}
        <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 opacity-5 pointer-events-none">
          <Leaf className="w-[500px] h-[500px]" />
        </div>

        <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            {/* Image side */}
            <div className="relative">
              <div className="aspect-4/5 bg-[#2a5c3e] rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-white/10">
                {/* Placeholder for actual image */}
                <Image
                  src="https://oepinbezzuykjqxxdrzn.supabase.co/storage/v1/object/public/tre-ba-lien/bep-tong-hop.jpg"
                  alt="Tré Đặc Sản Bình Định"
                  fill
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-6 -left-4 md:-left-10 bg-linear-to-br from-amber-50 to-orange-100 border border-white/20 text-white p-5 rounded-3xl shadow-2xl w-[220px]">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-bold text-3xl text-amber-600">❤️</span>
                  <div>
                    <p className="text-amber-600 font-semibold">Từ tâm huyết</p>
                    <p className="text-amber-600 text-xs">
                      Chợ Huyện, Bình Định
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Text side */}
            <div className="pt-8 md:pt-0">
              <Badge className="bg-white/10 text-emerald-300 border-white/10 mb-6 px-4 py-1.5 rounded-full text-xs tracking-widest uppercase font-semibold">
                Chuyện của bếp
              </Badge>

              <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-[1.2]">
                Đồ bán cho khách phải sạch và ngon,{" "}
                <span className="text-emerald-400 italic">
                  đúng chuẩn đồ nhà đang ăn.
                </span>
              </h2>

              <div className="space-y-5 text-emerald-50/80 text-base leading-relaxed">
                <p>
                  Mỗi phần tré, nem tại đây đều được làm thủ công tỉ mỉ. Đó là
                  sự kết hợp giữa kinh nghiệm gia truyền và nguyên liệu tươi
                  ngon được tuyển chọn kỹ lưỡng.
                </p>
                <p>
                  Không sử dụng hóa chất hay phụ gia, chúng tôi cam kết mang đến
                  sản phẩm an toàn và chất lượng nhất cho khách hàng.
                </p>
              </div>

              {/* Pull quote */}
              <div className="mt-8 border-l-2 border-emerald-400 pl-5">
                <Quote className="w-5 h-5 text-emerald-400 mb-2" />
                <p className="text-emerald-200 italic font-medium">
                  "Người quê làm hàng quê, cốt ở cái tình. Tré chả bán cho bà
                  con cũng là thức nhà mình ăn hàng ngày, tuyệt đối không vì vài
                  đồng lời mà làm ẩu."
                </p>
              </div>

              <Link href={PATH.ABOUT} className="inline-block mt-10">
                <Button
                  variant="outline"
                  className="rounded-full border-emerald-500/40 text-emerald-300 hover:bg-white hover:border-emerald-400 h-12 px-7 gap-2 group bg-transparent"
                >
                  Xem chi tiết hành trình
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          4. PROCESS — Horizontal timeline
          ═══════════════════════════════════════ */}
      <section className="py-24 bg-[#f8f7f4] px-4 md:px-6 border-b border-slate-200/60">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 mb-4 rounded-full px-4 py-1.5">
              Quy trình
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              4 bước · 1 cam kết
            </h2>
            <p className="text-slate-500 text-lg">
              Minh bạch từ lò bếp đến bàn ăn của bạn.
            </p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
            {/* Connector line */}
            <div className="hidden md:block absolute top-13 left-[15%] right-[15%] border-t-2 border-dashed border-slate-300" />

            {[
              {
                num: "01",
                icon: <Search className="w-6 h-6" />,
                title: "Tuyển Chọn",
                desc: "Thịt heo nóng từ lò mổ địa phương",
              },
              {
                num: "02",
                icon: <ChefHat className="w-6 h-6" />,
                title: "Chế Biến",
                desc: "Giã tay truyền thống, gia vị gia truyền, không dùng phụ gia.",
              },
              {
                num: "03",
                icon: <PackageCheck className="w-6 h-6" />,
                title: "Gói & Lên Men",
                desc: "Bọc lá ổi, lá chuối tươi. Lên men tự nhiên 24-36 tiếng.",
              },
              {
                num: "04",
                icon: <Truck className="w-6 h-6" />,
                title: "Giao Tận Tay",
                desc: "Đóng gói hút chân không, bảo quản lạnh, giao nhanh toàn quốc.",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="relative flex flex-col items-center text-center group z-10"
              >
                <div className="w-26 h-26 bg-white border-2 border-slate-200 group-hover:border-[#3a7851] rounded-3xl flex flex-col items-center justify-center mb-5 shadow-sm group-hover:shadow-lg group-hover:shadow-emerald-900/10 transition-all duration-300">
                  <span className="text-[#3a7851] mb-1">{step.icon}</span>
                  <span className="text-xs font-bold text-slate-400 tracking-widest">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-[180px]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          5. FEATURED PRODUCTS
          ═══════════════════════════════════════ */}
      <section className="py-24 px-4 md:px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-5">
            <div>
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 mb-4 rounded-full px-4 py-1.5">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                Được chọn nhiều nhất
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Đặc sản nổi bật
              </h2>
            </div>
            <Link href={PATH.PRODUCTS.ALL}>
              <Button
                variant="outline"
                className="rounded-full border-[#3a7851] text-[#3a7851] hover:bg-[#3a7851] hover:text-white px-7 h-11 font-semibold transition-all duration-200"
              >
                Xem tất cả
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          5b. TRÉ SPOTLIGHT — full-width editorial CTA
          ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#1a1208] py-20 px-4 md:px-6">
        {/* Warm amber ambient glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[700px] h-[400px] bg-amber-600/20 rounded-full blur-[120px]" />
        </div>
        {/* Dot texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#6b4c1e33_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* ── Left: visual ── */}
            <div className="relative flex items-center justify-center">
              {/* Main product card */}
              <div className="w-[300px] md:w-[340px] h-[380px] md:h-[440px] bg-linear-to-br from-amber-900/60 to-amber-950 rounded-[2.5rem] border border-amber-700/30 shadow-2xl shadow-amber-900/40 flex flex-col items-center justify-end pb-14 relative overflow-hidden">
                <Image
                  src="https://oepinbezzuykjqxxdrzn.supabase.co/storage/v1/object/public/tre-ba-lien/chen-tre.jpg"
                  alt="Tré Rơm Cổ Điển"
                  fill
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="text-center relative z-10">
                  <p className="text-white font-bold text-xl tracking-tight drop-shadow">
                    Tré Đặc Sản Bình Định
                  </p>
                  <p className="text-amber-300 text-sm mt-1 font-medium">
                    Chợ Huyện · Bình Định
                  </p>
                </div>
              </div>

              {/* Floating leaf chip */}
              <div className="absolute top-4 -right-2 md:-right-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 flex items-center gap-3 shadow-xl">
                <span className="text-2xl">🌿</span>
                <div>
                  <p className="text-white font-bold text-sm">Lá ổi tươi</p>
                  <p className="text-amber-300/80 text-xs">Lên men tự nhiên</p>
                </div>
              </div>

              {/* Floating rơm chip */}
              <div className="absolute -bottom-2 -left-2 md:-left-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-3 shadow-xl">
                <p className="text-xs text-amber-300/70 font-semibold uppercase tracking-wider">
                  Ủ rơm tự nhiên
                </p>
                <p className="text-white font-bold text-sm">24 – 36 tiếng</p>
              </div>
            </div>

            {/* ── Right: copy ── */}
            <div className="flex flex-col">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-400 mb-5">
                <span className="h-px w-8 bg-amber-600 block" />
                Đặc sản số 1 của Xứ Nẫu
              </span>

              <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1.1] mb-6">
                Tré Rơm
                <br />
                <span className="text-amber-400">Gia Truyền</span>
                <br />
                Bình Định.
              </h2>

              <p className="text-amber-100/70 text-base leading-relaxed mb-8 max-w-md">
                Lên men tự nhiên bằng{" "}
                <strong className="text-amber-200">lá ổi, rơm rạ</strong> —
                không hàn the, không chất bảo quản. Công thức tâm huyết giữ trọn
                vị chua thanh, dai giòn đặc trưng của miền Trung.
              </p>

              {/* Ingredient badges */}
              <div className="flex flex-wrap gap-2 mb-10">
                {[
                  "🥩 Thịt heo nóng",
                  "🌿 Lá ổi non",
                  "🌾 Rơm ủ tự nhiên",
                  "🚫 0% hàn the",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-white/10 text-amber-200 border border-white/15"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Trust stats */}
              <div className="flex gap-8 mb-10 pb-10 border-b border-white/10">
                {[
                  { value: "3 đời", label: "Gia truyền" },
                  { value: "200+", label: "Khách hài lòng" },
                  { value: "4.9★", label: "Đánh giá trung bình" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold text-amber-400">
                      {s.value}
                    </p>
                    <p className="text-xs text-amber-200/60 font-medium mt-0.5">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              <Link href={PATH.TRE} className="inline-flex self-start">
                <Button
                  size="lg"
                  className="h-14 px-12 rounded-full bg-amber-300 hover:bg-amber-400 text-amber-950 font-bold text-md shadow-2xl shadow-amber-900/40 hover:scale-105 transition-all duration-200 gap-2"
                >
                  Khám phá Tré Bình Định
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          6. TESTIMONIAL — Simple, warm quote
          ═══════════════════════════════════════ */}
      <section className="py-20 bg-emerald-50 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <Quote className="w-10 h-10 text-emerald-300 mx-auto mb-6" />
          <p className="text-2xl md:text-3xl font-medium text-slate-800 leading-relaxed italic mb-8">
            "Đặt thử một lần vì tò mò, giờ cứ 2 tuần là order lại. Tré rơm ở đây
            chua vừa, dai giòn, hoàn toàn khác với loại ngoài chợ."
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-700 font-bold">
              L
            </div>
            <div className="text-left">
              <p className="font-semibold text-slate-900 text-sm">
                Nguyễn Thuỳ Linh
              </p>
              <p className="text-slate-500 text-xs">
                Khách hàng tại TP. Hồ Chí Minh
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          7. BOTTOM CTA — Bold & clean
          ═══════════════════════════════════════ */}
      <section className="py-20 px-4 md:px-6 bg-white border-t border-slate-100">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-[#1a3d2b] rounded-[3rem] py-20 px-8 md:px-20 relative overflow-hidden text-center">
            {/* Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[500px] h-[300px] bg-emerald-500/20 rounded-full blur-[80px]" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
                Gói trọn vị quê,
                <br className="hidden md:block" /> gửi người trân quý.
              </h2>
              <p className="text-emerald-200 text-lg md:text-xl font-light mb-10 max-w-xl mx-auto leading-relaxed">
                Món quà biếu tặng hay bữa ăn gia đình — sự chân thật trong từng
                hương vị sẽ thay bạn nói lên tấm lòng.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <a
                  href={CONTACT_INFO.ZALO}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="h-14 px-8 rounded-full bg-[#0068FF] text-white hover:bg-[#0055d4] font-bold text-base shadow-2xl hover:scale-105 transition-all duration-200 gap-2 w-full sm:w-auto"
                  >
                    <ZaloIcon />
                    Zalo
                  </Button>
                </a>
                <a
                  href={CONTACT_INFO.FACEBOOK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="h-14 px-8 rounded-full bg-[#1877F2] text-white hover:bg-[#1466d8] font-bold text-base shadow-2xl hover:scale-105 transition-all duration-200 gap-2 w-full sm:w-auto"
                  >
                    <Facebook className="h-5 w-5" />
                    Facebook
                  </Button>
                </a>
                <a href={`mailto:${CONTACT_INFO.EMAIL}`}>
                  <Button
                    size="lg"
                    className="h-14 px-8 rounded-full bg-white/15 text-white hover:bg-white/25 font-bold text-base shadow-2xl hover:scale-105 transition-all duration-200 gap-2 border border-white/30 w-full sm:w-auto"
                  >
                    <Mail className="h-5 w-5" />
                    Email
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
