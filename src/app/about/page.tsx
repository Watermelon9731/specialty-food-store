import { CONTACT_INFO } from "@/constants/path";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Leaf,
  ShieldCheck,
  HeartHandshake,
  MapPin,
  ArrowRight,
  Quote,
  Facebook,
  Mail,
} from "lucide-react";
import ZaloIcon from "@/components/icons/ZaloIcon";

export const metadata = {
  title: "Về Chúng Tôi | Tré Bà Liên — Đặc Sản Bình Định",
  description:
    "Câu chuyện gia đình ba thế hệ giữ lửa nghề làm tré rơm truyền thống tại Chợ Huyện, Phù Cát, Bình Định.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      {/* ── Hero ── */}
      <section className="bg-[#1a3d2b] text-white py-20 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />
        <div className="container mx-auto max-w-7xl relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="bg-white/10 text-emerald-300 border-white/10 mb-6 px-4 py-1.5 rounded-full text-xs tracking-widest uppercase font-semibold">
              Về Tré Bà Liên
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] mb-6">
              Mình ăn sao,
              <br />
              <span className="text-emerald-400">bán cho khách</span>
              <br />
              vậy.
            </h1>
            <p className="text-emerald-100/80 text-lg leading-relaxed max-w-lg">
              Từ góc bếp nhỏ ở Chợ Huyện, Phù Cát, Bình Định — bà Liên cần mẫn
              giữ gìn công thức tré rơm gia truyền, không vì lợi nhuận mà đánh
              đổi chất lượng.
            </p>
          </div>

          {/* Floating stat cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { num: "❤️", label: "Từ đam mê nấu ăn", icon: "🏡" },
              { num: "0", label: "Chất bảo quản", icon: "🚫" },
              { num: "100%", label: "Làm thủ công", icon: "🤲" },
              {
                num: "Bình Định",
                label: "Chợ Huyện, Phù Cát",
                icon: "📍",
              },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-5"
              >
                <p className="text-2xl mb-1">{s.icon}</p>
                <p className="text-3xl font-bold text-emerald-300">{s.num}</p>
                <p className="text-emerald-100/70 text-sm font-medium">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Story section ── */}
      <section className="py-24 px-4 md:px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-5 gap-12 items-start">
            {/* Image */}
            <div className="md:col-span-2 relative">
              <div className="aspect-4/5 bg-[#2a5c3e] rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-white/10 relative">
                <Image
                  src="https://oepinbezzuykjqxxdrzn.supabase.co/storage/v1/object/public/tre-ba-lien/chen-tre.jpg"
                  alt="Tré Bà Liên"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl px-5 py-3 shadow-xl border border-slate-100">
                <p className="text-2xl font-bold text-[#3a7851]">❤️</p>
                <p className="text-slate-500 text-xs font-medium">
                  Từ đam mê nấu ăn
                </p>
              </div>
            </div>

            {/* Text */}
            <div className="md:col-span-3">
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 rounded-full px-4 py-1.5 mb-6 inline-flex">
                <MapPin className="w-3.5 h-3.5 mr-1.5" />
                Quy Nhơn, Bình Định
              </Badge>

              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 leading-tight">
                Ăn Sao <span className="text-[#3a7851]">Bán Vậy.</span>
              </h2>

              <div className="space-y-5 text-slate-600 text-base leading-relaxed italic">
                <p>
                  Là một người sinh ra và lớn lên tại Bình Định và Tré là một
                  món ăn truyền thống. Tôi đã tự mình tìm tòi, học hỏi cách làm.
                  Tôi dần cải tiến công thức theo cách riêng, giữ nguyên cái hồn
                  truyền thống nhưng tinh chỉnh để phù hợp với khẩu vị nhiều
                  người hơn.
                </p>
                <p>
                  Nguyên tắc của tôi rất đơn giản:{" "}
                  <strong className="text-slate-800 not-italic">
                    mình ăn sao thì bán cho khách vậy
                  </strong>
                  .
                </p>
              </div>

              {/* Attribution */}
              <div className="mt-10 border-l-4 border-[#3a7851] pl-6">
                <Quote className="w-6 h-6 text-emerald-300 mb-3" />
                <p className="text-lg font-semibold text-slate-800">
                  Đoàn Thị Bích Liên
                </p>
                <p className="text-slate-500 text-sm mt-1 font-medium">
                  Người sáng lập Tré Bà Liên
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-24 px-4 md:px-6 bg-[#f8f7f4]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Ba nguyên tắc không bao giờ thay đổi.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Leaf className="h-7 w-7" />,
                title: "Nói không với phụ gia",
                desc: "Không hàn the. Không chất bảo quản. Không phẩm màu. Vị tré đến từ lên men tự nhiên bằng lá ổi — đúng cách của bà xưa.",
                color: "emerald",
              },
              {
                icon: <ShieldCheck className="h-7 w-7" />,
                title: "Nguyên liệu chất lượng",
                desc: "Tai heo, bì heo lấy từ lò mổ quen, sả riềng tỏi mua sáng dùng sáng. Không dùng đồ đông lạnh, không dùng hàng tồn.",
                color: "teal",
                offset: true,
              },
              {
                icon: <HeartHandshake className="h-7 w-7" />,
                title: "Ăn sao bán vậy",
                desc: "Mỗi phần Tré đều được làm cẩn thận, tỉ mỉ, đảm bảo chất lượng.",
                color: "emerald",
              },
            ].map((v) => (
              <div
                key={v.title}
                className={`bg-white border border-slate-100 hover:border-emerald-200 rounded-[2rem] p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group ${v.offset ? "md:mt-8" : ""}`}
              >
                <div
                  className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-6 text-${v.color}-600 bg-${v.color}-50 border border-${v.color}-100 group-hover:bg-${v.color}-600 group-hover:text-black group-hover:border-transparent transition-all duration-300`}
                >
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {v.title}
                </h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 md:px-6 bg-white border-t border-slate-100">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-[#1a3d2b] rounded-[3rem] py-16 px-8 md:px-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[400px] h-[300px] bg-emerald-500/20 rounded-full blur-[80px]" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
                Thử một lần, nhớ mãi mãi.
              </h2>
              <p className="text-emerald-200 text-lg mb-8 max-w-lg mx-auto">
                Đặt hàng ngay hôm nay và cảm nhận sự khác biệt của tré thủ công
                Bình Định chính gốc.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={CONTACT_INFO.ZALO}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="h-13 px-10 rounded-full bg-[#0068FF] text-white hover:bg-[#0055d4] font-bold shadow-xl hover:scale-105 transition-all gap-2 w-full sm:w-auto"
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
                    className="h-13 px-10 rounded-full bg-[#1877F2] text-white hover:bg-[#1466d8] font-bold shadow-xl hover:scale-105 transition-all gap-2 w-full sm:w-auto"
                  >
                    <Facebook className="h-5 w-5" />
                    Facebook
                  </Button>
                </a>
                <a href={`mailto:${CONTACT_INFO.EMAIL}`}>
                  <Button
                    size="lg"
                    className="h-13 px-10 rounded-full bg-white/15 text-white hover:bg-white/25 border border-white/30 font-bold shadow-xl hover:scale-105 transition-all gap-2 w-full sm:w-auto"
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
