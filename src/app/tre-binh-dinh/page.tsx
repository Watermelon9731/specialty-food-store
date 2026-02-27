import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PATH, CONTACT_INFO } from "@/constants/path";
import {
  ArrowRight,
  CheckCircle2,
  ChefHat,
  FacebookIcon,
  Leaf,
  MapPin,
  PackageCheck,
  Quote,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import ZaloIcon from "@/components/icons/ZaloIcon";
import Image from "next/image";

export const metadata = {
  title: "Tré Rơm Gia Truyền Bình Định | Đặc Sản Xứ Nẫu",
  description:
    "Tré rơm Bình Định chính gốc — lên men tự nhiên bằng lá ổi, không hàn the, không chất bảo quản. Giao hỏa tốc toàn quốc.",
};

// ─── Product variants ─────────────────────────────────────────────────────────
const TRE_ROM = [
  {
    name: "Tré Rơm Truyền Thống",
    weight: "150g / 1 cây",
    price: "40.000 VNĐ",
    badge: "Đẹp mắt",
    highlight: true,
  },
  {
    name: "Tré Rơm Combo",
    weight: "1kg / 5 cây",
    price: "180.000 VNĐ",
    badge: "Tiết kiệm",
    highlight: false,
  },
];

const TRE_HU = [
  {
    name: "Tré Hũ Tiện Lợi",
    weight: "500g / 1 hũ",
    price: "150.000 VNĐ",
    badge: "Bán chạy nhất",
    highlight: true,
  },
  {
    name: "Tré Hũ Combo",
    weight: "1kg / 2 hũ",
    price: "280.000 VNĐ",
    badge: "Tiết kiệm",
    highlight: false,
  },
];

// ─── Process steps ────────────────────────────────────────────────────────────
const PROCESS = [
  {
    num: "01",
    icon: <Search className="w-6 h-6" />,
    title: "Tuyển Thịt",
    desc: "Thịt heo nóng hổi từ lò mổ địa phương — chọn phần tai heo đúng chuẩn.",
  },
  {
    num: "02",
    icon: <ChefHat className="w-6 h-6" />,
    title: "Giã & Trộn",
    desc: "Giã tay với sả, riềng, tỏi và mè rang. Hương vị gia truyền.",
  },
  {
    num: "03",
    icon: <Leaf className="w-6 h-6" />,
    title: "Gói Lá & Ủ",
    desc: "Bọc nhiều lớp lá ổi non, lá chuối tươi. Buộc rơm, ủ lên men tự nhiên.",
  },
  {
    num: "04",
    icon: <Truck className="w-6 h-6" />,
    title: "Đóng Gói & Giao",
    desc: "Bảo quản lạnh. Giao nhanh toàn quốc.",
  },
];

// ─── Reviews ─────────────────────────────────────────────────────────────────
const REVIEWS = [
  {
    name: "Nguyễn Thuỳ Linh",
    city: "TP. Hồ Chí Minh",
    text: "Đặt thử một lần vì tò mò, giờ cứ 2 tuần là order lại. Tré rơm ở đây chua vừa, dai giòn, hoàn toàn khác với loại ngoài chợ.",
    avatar: "L",
  },
  {
    name: "Trần Minh Khoa",
    city: "Hà Nội",
    text: "Mua về làm quà biếu, cả nhà ăn mê. Mùi thơm của lá ổi rất đặc trưng, vị không bị gắt như nhiều nơi khác.",
    avatar: "K",
  },
  {
    name: "Phạm Thị Thu",
    city: "Đà Nẵng",
    text: "Người Bình Định ăn tré cả đời nhưng mua ở đây vẫn thấy đúng vị nhất — giống y hệt bà ngoại tự làm hồi nhỏ.",
    avatar: "T",
  },
];

export default function TrePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f7f4] text-slate-800 overflow-hidden selection:bg-emerald-200">
      {/* ══════════════════════════════════════════════════
          1. HERO — Split editorial layout
      ══════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center px-4 md:px-6 overflow-hidden bg-[#f8f7f4]">
        {/* Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#d6d3c8_1px,transparent_1px)] bg-size-[28px_28px] opacity-50 pointer-events-none" />
        {/* Blobs */}
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-amber-100/40 rounded-full blur-[120px] translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-50/60 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="container mx-auto max-w-7xl relative z-10 grid md:grid-cols-2 gap-12 items-center py-24 md:py-0">
          {/* ── Left: copy ── */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-amber-200/60 rounded-full px-4 py-2 mb-8 shadow-sm">
              <MapPin className="w-4 h-4 text-amber-700" />
              <span className="text-sm font-semibold text-amber-700">
                Đặc sản Bình Định · Xứ Nẫu
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.06] mb-6">
              Tré Rơm{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#3a7851]">Gia Truyền</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                >
                  <path
                    d="M2 8 C 60 2, 160 10, 298 6"
                    stroke="#3a7851"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.4"
                  />
                </svg>
              </span>
              <br />
              Bình Định.
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
              Lên men tự nhiên bằng{" "}
              <strong className="text-slate-800">lá ổi, rơm rạ</strong> — không
              hàn the, không chất bảo quản. Công thức tâm huyết giữ trọn vị chua
              thanh, dai giòn đặc trưng của{" "}
              <strong className="text-slate-800">miền Trung</strong>.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href={CONTACT_INFO.ZALO}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="h-14 px-8 rounded-full bg-[#0068FF] hover:bg-[#0055d4] text-white text-base font-semibold shadow-lg shadow-[#0068FF]/25 hover:-translate-y-0.5 transition-all duration-200 gap-2"
                >
                  <ZaloIcon /> Đặt mua qua Zalo
                </Button>
              </a>
              <Link href="#story">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 rounded-full border-slate-300 text-slate-700 hover:bg-white hover:border-[#3a7851] hover:text-[#3a7851] text-base font-semibold transition-all duration-200 bg-white/60 backdrop-blur-sm"
                >
                  Câu chuyện bếp nhà
                </Button>
              </Link>
            </div>

            {/* Trust strip */}
            <div className="flex items-center gap-6 pt-8 border-t border-slate-200/60 w-full">
              {[
                { value: "3 đời", label: "Gia truyền" },
                { value: "24–36h", label: "Lên men tự nhiên" },
                { value: "0%", label: "Chất bảo quản" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-[#3a7851]">{s.value}</p>
                  <p className="text-sm text-slate-500 font-medium">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: visual collage ── */}
          <div className="relative hidden md:flex items-center justify-center">
            {/* Main card */}
            <div className="w-[360px] h-[480px] bg-linear-to-br from-amber-50 to-emerald-100 rounded-[2.5rem] shadow-2xl shadow-amber-900/15 overflow-hidden flex flex-col items-center justify-end pb-10 relative border border-amber-100">
              <Image
                src="https://oepinbezzuykjqxxdrzn.supabase.co/storage/v1/object/public/tre-ba-lien/tre-cay.jpg"
                alt="Tré Rơm Truyền Thống"
                fill
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="text-center absolute bottom-16 left-1/3 z-10">
                <div className="bg-black/40 p-4 rounded-2xl w-[220px] mx-auto">
                  <p className="text-white font-bold text-md drop-shadow">
                    Tré Rơm Truyền Thống
                  </p>
                  <p className="text-emerald-200 text-sm mt-1">
                    Chợ Huyện · Bình Định
                  </p>
                </div>
              </div>
            </div>

            {/* Floating ingredient chip */}
            <div className="absolute top-8 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-slate-100 flex items-center gap-3">
              <div className="h-10 w-10 bg-emerald-100 rounded-xl flex items-center justify-center text-xl">
                🌿
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">Lá ổi tươi</p>
                <p className="text-slate-500 text-xs">Ủ lên men tự nhiên</p>
              </div>
            </div>

            {/* Small product card */}
            <div className="absolute -bottom-4 -left-6 w-[220px] h-[388px] bg-linear-to-br from-[#1a3d2b] to-[#2a5c3e] rounded-[1.5rem] shadow-xl overflow-hidden flex flex-col items-center justify-end pb-6 border-4 border-white">
              <Image
                src="https://oepinbezzuykjqxxdrzn.supabase.co/storage/v1/object/public/tre-ba-lien/tre-hu.jpg"
                alt="Tré Hũ Hiện Đại"
                fill
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="text-center absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
                <div className="bg-black/40 p-4 rounded-2xl w-[180px] mx-auto">
                  <p className="text-white font-bold text-md drop-shadow">
                    Tré Hũ Hiện Đại
                  </p>
                  <p className="text-emerald-200 text-sm mt-1">
                    Tiện lợi · Dễ bảo quản
                  </p>
                </div>
              </div>
            </div>

            {/* Stars badge */}
            <div className="absolute top-1/3 -left-10 bg-white rounded-2xl px-4 py-3 shadow-xl border border-slate-100">
              <div className="flex gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-slate-800 font-bold text-sm">4.9 / 5</p>
              <p className="text-slate-400 text-xs">200+ đánh giá</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          2. WHAT IS TRÉ — Origin + identity
      ══════════════════════════════════════════════════ */}
      <section className="py-24 bg-white px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Visual */}
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto bg-linear-to-br from-amber-50 to-orange-100 rounded-[3rem] overflow-hidden shadow-2xl ring-1 ring-amber-200/40 flex items-center justify-center">
                <div className="text-center">
                  <Image
                    src={
                      "https://oepinbezzuykjqxxdrzn.supabase.co/storage/v1/object/public/tre-ba-lien/tre-ruot.jpg"
                    }
                    fill
                    alt="Tré Bà Liên"
                    className="object-cover rounded-2xl"
                  />
                  <p className="text-amber-800 font-semibold text-sm mt-4 px-4">
                    Lá ổi · Rơm rạ · Tré cuộn tay
                  </p>
                </div>
              </div>
              {/* Floating fact */}
              <div className="absolute -bottom-6 right-0 md:-right-8 bg-[#1a3d2b] text-white p-5 rounded-2xl shadow-2xl max-w-[200px]">
                <p className="text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-1">
                  Nguồn gốc
                </p>
                <p className="font-bold text-base leading-tight">
                  Bình Định · Xứ Nẫu
                </p>
                <p className="text-emerald-300 text-xs mt-1">Từ thế kỷ 19</p>
              </div>
            </div>

            {/* Copy */}
            <div>
              <Badge className="bg-amber-50 text-amber-700 border-amber-200 mb-5 rounded-full px-4 py-1.5">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                Tré là gì?
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-6">
                Tinh hoa lên men
                <br />
                <span className="text-[#3a7851]">của người Bình Định.</span>
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  <strong className="text-slate-800">Tré</strong> là món ăn lên
                  men truyền thống gắn liền với vùng đất Bình Định từ hàng thế
                  kỷ nay. Khác với nem chua miền Bắc hay miền Nam, tré được gói
                  bằng{" "}
                  <strong className="text-slate-800">nhiều lớp lá ổi</strong> —
                  lá non chứa tanin tự nhiên giúp tạo vị chát chua đặc trưng
                  không thể nhầm lẫn.
                </p>
                <p>
                  Nguyên liệu chính là tai heo, bì heo — thái sợi rồi trộn với{" "}
                  <strong className="text-slate-800">
                    sả, riềng, tỏi, mè rang, ớt và muối
                  </strong>
                  . Hỗn hợp được gói chặt, buộc rơm, ủ lên men 24-36 tiếng.
                </p>
                <p>
                  Kết quả là một loại thực phẩm lên men có vị{" "}
                  <strong className="text-slate-800">
                    chua dịu, thơm lá ổi, giòn dai quyến rũ
                  </strong>{" "}
                  — ăn kèm bánh tráng, rau sống, hoặc nhâm nhi cùng ly rượu đế
                  giải lao.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 mt-8">
                {[
                  "Lên men tự nhiên",
                  "Không hàn the",
                  "Không màu nhân tạo",
                  "Gia truyền 3 đời",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1.5 text-sm font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-4 py-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          3. STORY — Dark editorial block
      ══════════════════════════════════════════════════ */}
      <section
        id="story"
        className="bg-[#1a3d2b] text-white py-24 overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 opacity-5 pointer-events-none">
          <Leaf className="w-[500px] h-[500px]" />
        </div>

        <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-4/5 bg-[#2a5c3e] rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-white/10 flex items-center justify-center flex-col gap-4">
                <Image
                  src="https://oepinbezzuykjqxxdrzn.supabase.co/storage/v1/object/public/tre-ba-lien/chen-tre.jpg"
                  alt="Tré Rơm Cổ Điển"
                  fill
                  className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                />
              </div>
              {/* Stat card */}
              <div className="absolute -bottom-6 -right-4 md:-right-10 bg-white border border-white/20 text-white p-4 rounded-3xl shadow-2xl w-[250px]">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-900" />
                  <span className="font-bold text-3xl text-emerald-900">
                    ❤️
                  </span>
                  <div className="flex flex-col">
                    <p className="text-emerald-900 font-semibold">
                      Từ tâm huyết
                    </p>
                    <p className="text-emerald-900 text-xs mt-1">
                      Chợ Huyện · Bình Định
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="pt-8 md:pt-0">
              <Badge className="bg-white/10 text-emerald-300 border-white/10 mb-6 px-4 py-1.5 rounded-full text-xs tracking-widest uppercase font-semibold">
                Câu chuyện của nhà
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-[1.2]">
                Sản phẩm mình làm ra phải ăn được, thấy ngon{" "}
                <span className="text-emerald-400 italic">
                  thì khách hàng mới tin tưởng và dùng.
                </span>
              </h2>
              <div className="space-y-5 text-emerald-50/80 text-base leading-relaxed">
                <p>
                  Làm tré không khó, nhưng để giữ được vị ngon truyền thống thì
                  cần{" "}
                  <strong className="text-white">
                    sự cẩn trọng trong từng chi tiết nhỏ
                  </strong>
                  . Đôi tay hàng chục năm tuổi nghề của bà khắt khe từ bước chọn
                  nguyên liệu tươi sạch nhất, đến việc nhào trộn, gói ghém bằng
                  cả tấm lòng chân thật để trao gửi hương vị quê nhà trọn vẹn.
                </p>
                <p>
                  Vị chua thanh của tré đến từ quá trình lên men lá ổi tự nhiên.
                  Vị giòn dai đến từ tay giã đều —{" "}
                  <strong className="text-white">
                    không máy móc, không công thức công nghiệp
                  </strong>
                  .
                </p>
                <p>
                  Đây là di sản ẩm thực mà ông bà để lại — và chúng tôi giữ gìn
                  nó như một{" "}
                  <strong className="text-white">
                    lời hứa với thế hệ tiếp theo
                  </strong>
                  .
                </p>
              </div>

              <div className="mt-8 border-l-2 border-emerald-400 pl-5">
                <Quote className="w-5 h-5 text-emerald-400 mb-2" />
                <p className="text-emerald-200 italic font-medium">
                  "Mình ăn sao thì bán cho khách vậy"
                </p>
                <p className="text-emerald-500 text-sm mt-2">
                  — Bà Đoàn Thị Bích Liên, người kế thừa
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4. PROCESS — Horizontal timeline
      ══════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#f8f7f4] px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 mb-4 rounded-full px-4 py-1.5">
              Quy trình
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              4 bước · 1 cam kết
            </h2>
            <p className="text-slate-500 text-lg">
              Minh bạch từ bếp đến bàn ăn của bạn.
            </p>
          </div>
          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
            {/* Connector */}
            <div className="hidden md:block absolute top-14 left-[15%] right-[15%] border-t-2 border-dashed border-slate-300" />
            {PROCESS.map((step, idx) => (
              <div
                key={idx}
                className="relative flex flex-col items-center text-center group z-10"
              >
                <div className="w-28 h-28 bg-white border-2 border-slate-200 group-hover:border-[#3a7851] rounded-3xl flex flex-col items-center justify-center mb-5 shadow-sm group-hover:shadow-lg group-hover:shadow-emerald-900/10 transition-all duration-300">
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

      {/* ══════════════════════════════════════════════════
          5. INGREDIENTS — What makes it authentic
      ══════════════════════════════════════════════════ */}
      <section className="py-24 bg-white px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 mb-5 rounded-full px-4 py-1.5">
                <ChefHat className="w-3.5 h-3.5 mr-1.5" />
                Nguyên liệu
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-6">
                Đơn giản — nhưng
                <br />
                <span className="text-[#3a7851]">không thể thay thế.</span>
              </h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Không có gì bí ẩn. Chất lượng tré đến từ sự tươi ngon của từng
                nguyên liệu và sự tỉ mỉ của đôi bàn tay làm ra nó.
              </p>
              <div className="space-y-4">
                {[
                  {
                    emoji: "🥩",
                    name: "Tai heo tươi",
                    note: "Lấy từ lò mổ địa phương",
                  },
                  {
                    emoji: "🌿",
                    name: "Lá ổi non",
                    note: "Thu hái buổi sáng, tạo vị chát chua đặc trưng",
                  },
                  {
                    emoji: "🌾",
                    name: "Rơm rạ sạch",
                    note: "Buộc gói, giữ ẩm trong khi lên men",
                  },
                  {
                    emoji: "🧄",
                    name: "Sả · Riềng · Tỏi",
                    note: "Gia vị tươi, không bột, không chiết xuất",
                  },
                  {
                    emoji: "🌶️",
                    name: "Ớt và mè rang",
                    note: "Tạo vị cay nhẹ, thơm hạt mè",
                  },
                ].map((ing) => (
                  <div
                    key={ing.name}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-colors"
                  >
                    <span className="text-2xl">{ing.emoji}</span>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">
                        {ing.name}
                      </p>
                      <p className="text-slate-500 text-xs mt-0.5">
                        {ing.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Commitment cards */}
            <div className="grid grid-cols-1 gap-5">
              {[
                {
                  icon: <ShieldCheck className="h-6 w-6" />,
                  title: "Không hàn the",
                  desc: "Tuyệt đối không sử dụng hàn the hay chất tạo dai nhân tạo — sự giòn dai đến hoàn toàn từ quy trình chế biến đúng kỹ thuật.",
                  color: "emerald",
                },
                {
                  icon: <Leaf className="h-6 w-6" />,
                  title: "Không chất bảo quản",
                  desc: "Lên men tự nhiên giúp tré giữ được 5–7 ngày ở nhiệt độ phòng và lên đến 30 ngày khi bảo quản lạnh — nói không với phụ gia.",
                  color: "teal",
                },
                {
                  icon: <PackageCheck className="h-6 w-6" />,
                  title: "Đóng gói cẩn thận",
                  desc: "Đóng gói cẩn thận giúp giữ tré tươi ngon trong quá trình vận chuyển.",
                  color: "emerald",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="group bg-slate-50 hover:bg-white border border-slate-100 hover:border-emerald-200 rounded-3xl p-7 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/5 hover:-translate-y-0.5"
                >
                  <div
                    className={`h-12 w-12 rounded-2xl flex items-center justify-center mb-4 text-${card.color}-600 bg-${card.color}-50 border border-${card.color}-100 group-hover:bg-${card.color}-600 group-hover:text-black group-hover:border-transparent transition-all duration-300`}
                  >
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          6. VARIANTS — Two product categories
      ══════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#f8f7f4] px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 mb-4 rounded-full px-4 py-1.5">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Sản phẩm
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Hai kiểu đóng gói — cùng một hương vị
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Dù gói rơm truyền thống hay hũ nhựa tiện lợi, tré đều được làm từ
              cùng một công thức gia truyền.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* ── Category 1: Tré Rơm ── */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">🌾</span>
                <h3 className="text-2xl font-bold text-slate-900">Tré Rơm</h3>
              </div>
              <p className="text-slate-500 text-sm mb-4 leading-relaxed">
                Gói bằng lá ổi, buộc rơm truyền thống — đẹp mắt, sang trọng, lý
                tưởng làm{" "}
                <strong className="text-slate-700">quà biếu tặng</strong>.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  "🎁 Quà biếu sang trọng",
                  "🌿 Lá ổi & rơm rạ",
                  "📸 Đẹp mắt trình bày",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="space-y-4">
                {TRE_ROM.map((v) => (
                  <div
                    key={v.name}
                    className={`rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl ${v.highlight ? "border-[#3a7851] bg-[#1a3d2b] text-white ring-2 ring-[#3a7851]/30" : "border-slate-200 bg-white hover:border-emerald-200"}`}
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="text-4xl shrink-0">🌾</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h4
                              className={`text-lg font-bold ${v.highlight ? "text-white" : "text-slate-900"}`}
                            >
                              {v.name}
                            </h4>
                            {v.badge && (
                              <span
                                className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${v.highlight ? "bg-emerald-400/20 text-emerald-300 border border-emerald-400/30" : "bg-emerald-50 text-emerald-700 border border-emerald-200"}`}
                              >
                                {v.badge}
                              </span>
                            )}
                          </div>
                          <p
                            className={`text-sm ${v.highlight ? "text-emerald-300" : "text-slate-500"}`}
                          >
                            {v.weight}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p
                          className={`text-2xl font-bold ${v.highlight ? "text-emerald-300" : "text-[#3a7851]"}`}
                        >
                          {v.price}
                        </p>
                        <a
                          href={CONTACT_INFO.ZALO}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            size="sm"
                            className={`rounded-full h-10 px-6 font-semibold text-sm ${v.highlight ? "bg-[#0068FF] hover:bg-[#0055d4] text-white" : "bg-[#3a7851] hover:bg-[#2f6342] text-white"}`}
                          >
                            Đặt mua
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Category 2: Tré Hũ ── */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">🫙</span>
                <h3 className="text-2xl font-bold text-slate-900">Tré Hũ</h3>
              </div>
              <p className="text-slate-500 text-sm mb-4 leading-relaxed">
                Đóng hũ nhựa kín,{" "}
                <strong className="text-slate-700">bảo quản lâu hơn</strong>, dễ
                vận chuyển, tiện dùng nhiều lần — phù hợp ăn dần và ship xa.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  "📦 Dễ vận chuyển",
                  "❄️ Bảo quản lâu",
                  "🔄 Dùng nhiều lần",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="space-y-4">
                {TRE_HU.map((v) => (
                  <div
                    key={v.name}
                    className={`rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl ${v.highlight ? "border-[#3a7851] bg-[#1a3d2b] text-white ring-2 ring-[#3a7851]/30" : "border-slate-200 bg-white hover:border-emerald-200"}`}
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="text-4xl shrink-0">🫙</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h4
                              className={`text-lg font-bold ${v.highlight ? "text-white" : "text-slate-900"}`}
                            >
                              {v.name}
                            </h4>
                            {v.badge && (
                              <span
                                className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${v.highlight ? "bg-emerald-400/20 text-emerald-300 border border-emerald-400/30" : "bg-emerald-50 text-emerald-700 border border-emerald-200"}`}
                              >
                                {v.badge}
                              </span>
                            )}
                          </div>
                          <p
                            className={`text-sm ${v.highlight ? "text-emerald-300" : "text-slate-500"}`}
                          >
                            {v.weight}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p
                          className={`text-2xl font-bold ${v.highlight ? "text-emerald-300" : "text-[#3a7851]"}`}
                        >
                          {v.price}
                        </p>
                        <a
                          href={CONTACT_INFO.ZALO}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            size="sm"
                            className={`rounded-full h-10 px-6 font-semibold text-sm ${v.highlight ? "bg-[#0068FF] hover:bg-[#0055d4] text-white" : "bg-[#3a7851] hover:bg-[#2f6342] text-white"}`}
                          >
                            Đặt mua
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-slate-400 mt-8">
            Giá chưa bao gồm phí vận chuyển · Freeship đơn từ 500.000 VNĐ
          </p>
          <p className="text-center text-xs text-slate-400 mt-1 italic">
            * Giá có thể thay đổi nhẹ tuỳ theo giá thị trường và dịp lễ, Tết.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          7. REVIEWS
      ══════════════════════════════════════════════════ */}
      <section className="py-24 bg-white px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <Badge className="bg-amber-50 text-amber-700 border-amber-200 mb-4 rounded-full px-4 py-1.5">
              <Star className="w-3.5 h-3.5 mr-1.5 fill-amber-400" />
              Khách hàng nói gì
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Tin tưởng từ hàng trăm khách hàng
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <div
                key={r.name}
                className="bg-slate-50 rounded-3xl p-7 border border-slate-100 hover:border-emerald-200 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-slate-600 leading-relaxed text-sm mb-6 italic">
                  "{r.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">
                    {r.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">
                      {r.name}
                    </p>
                    <p className="text-slate-400 text-xs">{r.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          8. HOW TO ENJOY — Serving suggestions
      ══════════════════════════════════════════════════ */}
      <section className="py-20 bg-emerald-50 px-4 md:px-6 border-y border-emerald-100">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <Badge className="bg-white text-emerald-700 border-emerald-200 mb-4 rounded-full px-4 py-1.5">
              Thưởng thức
            </Badge>
            <h2 className="text-3xl font-bold text-slate-900">
              Tré ngon nhất khi…
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 md:grid-cols-5 gap-5">
            {[
              {
                emoji: "🫓",
                title: "Với bánh tráng",
                desc: "Cuộn cùng rau sống và nước mắm tỏi ớt chua ngọt.",
              },
              {
                emoji: "🥢",
                title: "Với chả và nem chua",
                desc: "Trộn cùng chả, nem chua, rau sống và nước mắm chua ngọt.",
              },
              {
                emoji: "🥬",
                title: "Với rau sống",
                desc: "Chuối chát, khế, dưa leo, rau thơm đi cùng rất hợp.",
              },
              {
                emoji: "🍶",
                title: "Nhâm nhi giải lao",
                desc: "Ăn kèm rượu đế Bình Định — cách thưởng thức truyền thống.",
              },
              {
                emoji: "🎁",
                title: "Làm quà biếu",
                desc: "Hút chân không tiện gửi, đóng hộp quà theo yêu cầu.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-6 border border-emerald-100 text-center hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-3">{item.emoji}</div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          9. CTA — Bottom conversion block
      ══════════════════════════════════════════════════ */}
      <section className="py-20 px-4 md:px-6 bg-white border-t border-slate-100">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-[#1a3d2b] rounded-[3rem] py-20 px-8 md:px-20 relative overflow-hidden text-center">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[500px] h-[300px] bg-emerald-500/20 rounded-full blur-[80px]" />
            </div>
            <div className="relative z-10">
              <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-4">
                Đặt mua ngay hôm nay
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
                Gói trọn vị quê,
                <br className="hidden md:block" /> gửi người trân quý.
              </h2>
              <p className="text-emerald-200 text-lg font-light mb-10 max-w-xl mx-auto leading-relaxed">
                Món quà biếu tặng ý nghĩa hay bữa ăn gia đình ấm áp — tré rơm
                Bình Định sẽ thay bạn nói lên tấm lòng.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={CONTACT_INFO.ZALO}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="h-14 px-12 rounded-full bg-blue-50 text-[#0068FF] hover:bg-[#0068FF] hover:text-white font-bold text-base shadow-2xl hover:scale-105 transition-all duration-200 w-full sm:w-auto gap-2"
                  >
                    <ZaloIcon />
                    Đặt mua qua Zalo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <a
                  href={CONTACT_INFO.ZALO}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="h-14 px-12 rounded-full bg-[#0068FF] text-white hover:bg-blue-50
                    hover:text-[#0068FF] font-bold text-base shadow-2xl hover:scale-105 transition-all duration-200 w-full sm:w-auto gap-2"
                  >
                    <FacebookIcon />
                    Đặt mua qua Facebook
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <Link href={PATH.PRODUCTS.ALL}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 px-10 rounded-full border-emerald-500/40 text-emerald-300 hover:text-white hover:bg-emerald-800 font-semibold text-base bg-transparent w-full sm:w-auto"
                  >
                    Xem thêm sản phẩm
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
