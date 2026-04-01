"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PATH, CONTACT_INFO } from "@/constants/path";
import { useCart } from "@/hooks/use-cart";
import { ChefHat, Menu, ShoppingBag, MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import BrandLogo from "../brand-logo/BrandLogo";
import ZaloIcon from "../icons/ZaloIcon";

const NAV_LINKS = [
  { href: PATH.PRODUCTS.ALL, label: "Sản phẩm" },
  { href: PATH.CATEGORIES, label: "Danh mục" },
  { href: PATH.BLOG.ALL, label: "Tin tức" },
  { href: PATH.ABOUT, label: "Về chúng tôi" },
  { href: PATH.CONTACT, label: "Liên hệ" },
];

export function Header() {
  const { items, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);

  const pathName = usePathname();
  const isDisabled = pathName.includes("/admin");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header
      className={
        `sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-slate-100"
            : "bg-[#f8f7f4]/80 backdrop-blur-sm border-b border-transparent"
        }` + (isDisabled ? " hidden" : "")
      }
    >
      <div className="container mx-auto flex h-[64px] max-[375px]:h-[58px] md:h-[68px] items-center justify-between px-3 max-[375px]:px-2.5 sm:px-4 md:px-6 max-w-7xl">
        {/* ── Logo ── */}
        <Link href="/">
          <BrandLogo />
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-[#1a3d2b] hover:bg-white rounded-full transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
          {/* Tré spotlight pill */}
          <Link
            href={PATH.TRE}
            className="ml-1 flex items-center gap-1.5 px-4 py-2 text-sm font-bold rounded-full bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 hover:border-amber-300 transition-all duration-200 shadow-sm"
          >
            <span>🥩</span>
            Tré Bình Định
          </Link>
        </nav>

        {/* ── Right actions ── */}
        <div className="flex items-center gap-1.5 max-[375px]:gap-1 sm:gap-2">
          {/* Cart */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Mở giỏ hàng"
            className="relative flex items-center gap-1.5 sm:gap-2 bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#3a7851] text-slate-700 hover:text-[#1a3d2b] rounded-full h-9 max-[375px]:h-8 sm:h-10 px-3 max-[375px]:px-2.5 sm:px-4 transition-all duration-200 shadow-sm text-xs sm:text-sm font-semibold"
          >
            <ShoppingBag className="h-4 w-4 max-[375px]:h-3.5 max-[375px]:w-3.5" />
            <span className="hidden min-[420px]:inline">Giỏ hàng</span>
            {itemCount > 0 && (
              <span className="flex items-center justify-center h-5 w-5 max-[375px]:h-[18px] max-[375px]:w-[18px] rounded-full bg-[#3a7851] text-white text-[10px] max-[375px]:text-[9px] font-bold shadow-sm">
                {itemCount}
              </span>
            )}
          </button>

          {/* CTA — desktop */}
          <a
            href={CONTACT_INFO.ZALO}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex"
          >
            <Button
              size="sm"
              className="rounded-full bg-[#0068FF] hover:bg-[#0055d4] text-white h-10 px-5 font-semibold shadow-md transition-all duration-200 gap-1.5"
            >
              <ZaloIcon />
              Zalo
            </Button>
          </a>

          {/* Mobile hamburger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-9 w-9 max-[375px]:h-8 max-[375px]:w-8 sm:h-10 sm:w-10 rounded-full hover:bg-white"
                aria-label="Mở menu"
              >
                <Menu className="h-5 w-5 max-[375px]:h-[18px] max-[375px]:w-[18px]" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-[90vw] max-w-[320px] max-[375px]:max-w-[300px] p-0 border-r-0 bg-[#f8f7f4]"
            >
              <SheetTitle className="sr-only">Menu điều hướng</SheetTitle>

              {/* Sidebar header */}
              <div className="flex items-center gap-2.5 max-[375px]:gap-2 p-6 max-[375px]:p-5 border-b border-slate-200/60">
                <div className="bg-[#1a3d2b] p-2 max-[375px]:p-1.5 rounded-xl text-white">
                  <ChefHat className="h-5 w-5 max-[375px]:h-4 max-[375px]:w-4" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-bold text-[17px] max-[375px]:text-[15px] tracking-tight text-slate-900">
                    Tré Bà Liên
                  </span>
                  <span className="text-[10px] max-[375px]:text-[9px] text-[#3a7851] font-semibold tracking-[0.12em] uppercase">
                    Tré & Chả Nem Bình Định
                  </span>
                </div>
              </div>

              {/* Sidebar nav */}
              <nav className="flex flex-col p-4 max-[375px]:p-3.5 gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center px-4 max-[375px]:px-3.5 py-3.5 max-[375px]:py-3 text-base max-[375px]:text-[15px] font-semibold text-slate-700 hover:text-[#1a3d2b] hover:bg-white rounded-2xl transition-all duration-150"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Tré featured card — mobile */}
              <div className="mx-4 max-[375px]:mx-3.5 mb-2 rounded-2xl bg-amber-50 border border-amber-200 p-4 max-[375px]:p-3.5">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-1">
                  Đặc sản nổi bật
                </p>
                <p className="font-bold text-slate-900 text-base max-[375px]:text-sm mb-0.5">
                  🥩 Tré Rơm Thủ Công
                </p>
                <p className="text-xs text-slate-500 mb-3">
                  Bình Định · Lên men tự nhiên · Thủ công
                </p>
                <Link href={PATH.TRE} className="block">
                  <Button className="w-full rounded-full bg-amber-800 hover:bg-amber-900 text-white h-10 font-semibold text-sm">
                    Xem ngay →
                  </Button>
                </Link>
              </div>

              {/* Sidebar CTA */}
              <div className="p-4 max-[375px]:p-3.5 mt-4 border-t border-slate-200/60">
                <a
                  href={CONTACT_INFO.ZALO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full rounded-full bg-[#0068FF] hover:bg-[#0055d4] text-white h-12 max-[375px]:h-11 font-semibold text-base max-[375px]:text-sm gap-2">
                    <MessageCircle className="h-5 w-5 max-[375px]:h-[18px] max-[375px]:w-[18px]" />
                    Đặt mua qua Zalo
                  </Button>
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
