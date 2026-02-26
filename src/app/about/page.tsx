import { CONTACT_INFO } from "@/constants/path";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChefHat,
  Leaf,
  ShieldCheck,
  HeartHandshake,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Quote,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      {/* ── Hero ── */}
      <section className="bg-[#1a3d2b] text-white py-20 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />
        <div className="container mx-auto max-w-7xl relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="bg-white/10 text-emerald-300 border-white/10 mb-6 px-4 py-1.5 rounded-full text-xs tracking-widest uppercase font-semibold">
              Câu chuyện của tiệm
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] mb-6">
              Ba thế hệ,
              <br />
              <span className="text-emerald-400">một tình yêu</span>
              <br />
              với nghề cũ.
            </h1>
            <p className="text-emerald-100/80 text-lg leading-relaxed max-w-lg">
              Từ góc bếp nhỏ ở Chợ Huyện, Bình Định, những người phụ nữ trong
              gia đình chúng tôi cần mẫn giữ lửa cho công thức nem chả, tré rơm
              qua từng mùa.
            </p>
          </div>

          {/* Floating stat cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { num: "3", label: "Thế hệ gia truyền", icon: "🏡" },
              { num: "0", label: "Chất bảo quản", icon: "🚫" },
              { num: "100%", label: "Chế biến thủ công", icon: "🤲" },
              { num: "1960s", label: "Bắt đầu từ năm", icon: "📅" },
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
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg prose-slate max-w-none">
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 rounded-full px-4 py-1.5 mb-6 not-prose inline-flex">
              <MapPin className="w-3.5 h-3.5 mr-1.5" />
              Chợ Huyện, Phù Cát, Bình Định
            </Badge>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 not-prose leading-tight">
              Lò bếp không bao giờ tắt
              <br />
              <span className="text-[#3a7851]">từ năm 1960.</span>
            </h2>

            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <p>
                Bà nội của chúng tôi bắt đầu làm nem chả từ những năm 1960 tại
                chợ Phù Cát. Thời đó, chưa có máy móc, chưa có túi hút chân
                không — chỉ có đôi tay, chiếc cối đá và niềm đam mê với hương vị
                quê hương.
              </p>
              <p>
                Đến thế hệ thứ hai, mẹ chúng tôi tiếp nối và mở rộng thêm các
                dòng sản phẩm hải sản khô từ biển Quy Nhơn — mực ngào, cá cơm,
                tôm khô. Tất cả đều được tẩm ướp và phơi sấy hoàn toàn thủ công
                theo mùa.
              </p>
              <p>
                Hôm nay, thế hệ thứ ba của chúng tôi mang lò bếp đó lên internet
                — không để công nghiệp hóa, mà để nhiều người hơn được thưởng
                thức vị ngon thuần khiết từ vùng đất Xứ Nẫu.
              </p>
            </div>

            {/* Pull quote */}
            <div className="my-12 border-l-4 border-[#3a7851] pl-8 not-prose">
              <Quote className="w-8 h-8 text-emerald-300 mb-3" />
              <p className="text-2xl font-medium text-slate-800 italic leading-relaxed">
                "Mỗi lọn tré, mỗi chiếc nem đều có linh hồn của người làm ra nó.
                Chúng tôi không bán hàng loạt vì đó là điều bà nội dặn."
              </p>
              <p className="text-slate-500 text-sm mt-4 font-medium">
                — Người sáng lập, thế hệ thứ ba
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-24 px-4 md:px-6 bg-[#f8f7f4]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Điều chúng tôi tin
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Những giá trị cốt lõi không thay đổi qua ba thế hệ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Leaf className="h-7 w-7" />,
                title: "Thuần tự nhiên",
                desc: "Không hàn the. Không phụ gia. Không chất bảo quản công nghiệp. Mọi hương vị đến từ nguyên liệu tươi và quy trình lên men tự nhiên.",
                color: "emerald",
              },
              {
                icon: <ShieldCheck className="h-7 w-7" />,
                title: "Minh bạch tuyệt đối",
                desc: "Chúng tôi biết tên người bán thịt, biết con thuyền nào đánh bắt mực. Sự minh bạch là cam kết không phải slogan.",
                color: "teal",
                offset: true,
              },
              {
                icon: <HeartHandshake className="h-7 w-7" />,
                title: "Tôn vinh nghề cũ",
                desc: "Kỹ thuật giã tay, bọc lá ổi, buộc rơm — những thao tác tưởng lỗi thời này chính là bí quyết tạo ra hương vị không máy nào làm được.",
                color: "emerald",
              },
            ].map((v) => (
              <div
                key={v.title}
                className={`bg-white border border-slate-100 hover:border-emerald-200 rounded-[2rem] p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group ${v.offset ? "md:mt-8" : ""}`}
              >
                <div
                  className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-6 text-${v.color}-600 bg-${v.color}-50 border border-${v.color}-100 group-hover:bg-${v.color}-600 group-hover:text-white group-hover:border-transparent transition-all duration-300`}
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
                Đặt hàng ngay hôm nay và cảm nhận sự khác biệt của đặc sản thủ
                công Bình Định.
              </p>
              <a
                href={CONTACT_INFO.ZALO}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="h-13 px-10 rounded-full bg-white text-[#0068FF] hover:bg-blue-50 font-bold shadow-xl hover:scale-105 transition-all gap-2"
                >
                  💬 Đặt mua qua Zalo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
