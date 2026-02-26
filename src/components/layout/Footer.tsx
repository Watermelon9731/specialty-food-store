import { CONTACT_INFO, PATH } from "@/constants/path";
import { formatPhoneNumber } from "@/lib/utils";
import {
  ArrowRight,
  Ban,
  Facebook,
  ChefHat,
  House,
  Instagram,
  Leaf,
  MapPin,
  Phone,
  Truck,
} from "lucide-react";
import Link from "next/link";

const SHOP_LINKS = [
  { href: PATH.TRE, label: "🥩 Tré Bình Định", highlight: true },
  { href: PATH.PRODUCTS_SEAFOOD, label: "Hải Sản Khô", highlight: false },
  { href: PATH.PRODUCTS_MEAT, label: "Bò khô/ Heo khô", highlight: false },
  { href: PATH.PRODUCTS_NEM_CHA, label: "Nem Chả Đặc Sản", highlight: false },
  {
    href: PATH.PRODUCTS_SPICES,
    label: "Gia Vị Truyền Thống",
    highlight: false,
  },
];

const INFO_LINKS = [
  { href: PATH.ABOUT, label: "Câu chuyện bếp nhà" },
  { href: PATH.CONTACT, label: "Liên hệ" },
  { href: PATH.TERMS, label: "Điều khoản sử dụng" },
  { href: PATH.PRIVACY, label: "Chính sách bảo mật" },
];

export function Footer() {
  return (
    <footer className="bg-[#1a3d2b] text-white">
      {/* ── Top strip — CTA ── */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 md:px-6 py-12 max-w-7xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-400 mb-2">
              🥩 Đặc sản bán chạy nhất
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug mb-2">
              Tré Gia Truyền Bình Định
            </h2>
            <p className="text-emerald-200/70 text-sm leading-relaxed">
              Lên men tự nhiên bằng lá ổi · Không hàn the · Làm bằng tâm huyết
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href={PATH.TRE}
              className="flex items-center justify-center gap-2 bg-amber-300 hover:bg-amber-400 text-amber-950 hover:text-amber-100 font-bold px-7 h-12 rounded-full text-sm transition-all duration-200 shadow-lg hover:scale-105 group"
            >
              Khám phá Tré Ngay
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={PATH.PRODUCTS}
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 h-12 rounded-full text-sm transition-all duration-200 border border-white/20"
            >
              Xem tất cả sản phẩm
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="container mx-auto px-4 md:px-6 py-16 max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand column */}
        <div className="sm:col-span-2 lg:col-span-1 space-y-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-white/15 group-hover:bg-[#3a7851] p-2.5 rounded-xl transition-all duration-200">
              <ChefHat className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-xl tracking-tight">
                Tré Bà Liên
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold tracking-[0.15em] uppercase">
                Tré & Chả Nem Bình Định
              </span>
            </div>
          </Link>

          <p className="text-emerald-100/70 text-sm leading-relaxed max-w-xs">
            Tré Bà Liên — tên gọi của sự kiên nhẫn. Tré rơm lên men tự nhiên,
            làm thủ công từ tâm huyết. Gìn giữ hương vị chính gốc của vùng đất
            Xứ Nẫu.
          </p>

          {/* Contact info */}
          <div className="space-y-3 text-sm">
            <a
              href={`tel:${CONTACT_INFO.PHONE_CODE}${CONTACT_INFO.PHONE}`}
              className="flex items-center gap-2.5 text-emerald-200/80 hover:text-emerald-300 transition-colors group"
            >
              <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
              {CONTACT_INFO.PHONE_CODE} {formatPhoneNumber(CONTACT_INFO.PHONE)}
            </a>
            {/* <a
              href={`mailto:${CONTACT_INFO.EMAIL}`}
              className="flex items-center gap-2.5 text-emerald-200/80 hover:text-emerald-300 transition-colors group"
            >
              <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
              {CONTACT_INFO.EMAIL}
            </a> */}
            <div className="flex items-start gap-2.5 text-emerald-200/80">
              <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>{CONTACT_INFO.ADDRESS}</span>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3 pt-2">
            <a
              href={CONTACT_INFO.FACEBOOK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="h-9 w-9 rounded-full bg-white/10 hover:bg-[#1877F2] flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="h-9 w-9 rounded-full bg-white/10 hover:bg-[#3a7851] flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={CONTACT_INFO.ZALO}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Zalo"
              className="h-9 w-9 rounded-full bg-white/10 hover:bg-[#0068FF] flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
            >
              <span className="text-[10px] font-bold">Zalo</span>
            </a>
          </div>
        </div>

        {/* Cửa hàng */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-400 mb-6">
            Cửa Hàng
          </h3>
          <ul className="space-y-3">
            {SHOP_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm transition-colors flex items-center gap-1.5 group ${
                    link.highlight
                      ? "text-amber-300 hover:text-amber-200 font-semibold"
                      : "text-emerald-100/70 hover:text-white"
                  }`}
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-emerald-400">
                    →
                  </span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Thông tin */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-400 mb-6">
            Thông Tin
          </h3>
          <ul className="space-y-3">
            {INFO_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-emerald-100/70 hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-emerald-400">
                    →
                  </span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Cam kết */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-400 mb-6">
            Cam Kết
          </h3>
          <div className="space-y-4">
            {[
              {
                emoji: <Ban className="w-4 h-4" />,
                text: "Không hàn the, không phụ gia",
              },
              {
                emoji: <Leaf className="w-4 h-4" />,
                text: "Lên men tự nhiên bằng lá ổi",
              },
              {
                emoji: <House className="w-4 h-4" />,
                text: "Sản xuất thủ công quy mô nhỏ",
              },
              {
                emoji: <Truck className="w-4 h-4" />,
                text: "Giao hàng toàn quốc, đóng gói lạnh",
              },
            ].map((item) => (
              <div key={item.text} className="flex items-start gap-3">
                <span className="text-base leading-none mt-0.5 shrink-0">
                  {item.emoji}
                </span>
                <p className="text-sm text-emerald-100/70 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6 py-5 max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-400/60">
          <p>
            © {new Date().getFullYear()} Tré Bà Liên · Bình Định, Việt Nam. Mọi
            quyền được bảo lưu.
          </p>
          <p className="flex items-center gap-1">
            Làm với <span className="text-red-400 mx-0.5">❤</span> từ Xứ Nẫu
          </p>
        </div>
      </div>
    </footer>
  );
}
