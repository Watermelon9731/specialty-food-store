"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PATH } from "@/constants/path";
import { useCart } from "@/hooks/use-cart";
import { Fish, Menu, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: PATH.PRODUCTS, label: "Sản phẩm" },
  { href: PATH.CATEGORIES, label: "Danh mục" },
  { href: PATH.ABOUT, label: "Về chúng tôi" },
  { href: PATH.CONTACT, label: "Liên hệ" },
];

export function Header() {
  const { items, setOpen } = useCart();
  const [isMounted, setIsMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const pathName = usePathname();

  useEffect(() => {
    setIsMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathName.includes("/admin")) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [pathName]);

  const itemCount = isMounted
    ? items.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

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
      <div className="container mx-auto flex h-[68px] items-center justify-between px-4 md:px-6 max-w-7xl">
        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="bg-[#1a3d2b] group-hover:bg-[#3a7851] p-2 rounded-xl text-white shadow-md transition-all duration-200 group-hover:scale-110">
            <Fish className="h-5 w-5" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-bold text-[17px] tracking-tight text-slate-900">
              Tiệm Đồ Khô
            </span>
            <span className="text-[10px] text-[#3a7851] font-semibold tracking-[0.12em] uppercase hidden sm:block">
              Đặc sản Bình Định
            </span>
          </div>
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
        </nav>

        {/* ── Right actions ── */}
        <div className="flex items-center gap-2">
          {/* Cart */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Mở giỏ hàng"
            className="relative flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#3a7851] text-slate-700 hover:text-[#1a3d2b] rounded-full h-10 px-4 transition-all duration-200 shadow-sm text-sm font-semibold"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Giỏ hàng</span>
            {itemCount > 0 && (
              <span className="flex items-center justify-center h-5 w-5 rounded-full bg-[#3a7851] text-white text-[10px] font-bold shadow-sm">
                {itemCount}
              </span>
            )}
          </button>

          {/* CTA — desktop */}
          <Link href="/products" className="hidden md:inline-flex">
            <Button
              size="sm"
              className="rounded-full bg-[#1a3d2b] hover:bg-[#3a7851] text-white h-10 px-5 font-semibold shadow-md transition-all duration-200"
            >
              Mua ngay
            </Button>
          </Link>

          {/* Mobile hamburger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-10 w-10 rounded-full hover:bg-white"
                aria-label="Mở menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-[300px] p-0 border-r-0 bg-[#f8f7f4]"
            >
              <SheetTitle className="sr-only">Menu điều hướng</SheetTitle>

              {/* Sidebar header */}
              <div className="flex items-center gap-2.5 p-6 border-b border-slate-200/60">
                <div className="bg-[#1a3d2b] p-2 rounded-xl text-white">
                  <Fish className="h-5 w-5" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-bold text-[17px] tracking-tight text-slate-900">
                    Tiệm Đồ Khô
                  </span>
                  <span className="text-[10px] text-[#3a7851] font-semibold tracking-[0.12em] uppercase">
                    Đặc sản Bình Định
                  </span>
                </div>
              </div>

              {/* Sidebar nav */}
              <nav className="flex flex-col p-4 gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center px-4 py-3.5 text-base font-semibold text-slate-700 hover:text-[#1a3d2b] hover:bg-white rounded-2xl transition-all duration-150"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Sidebar CTA */}
              <div className="p-4 mt-4 border-t border-slate-200/60">
                <Link href="/products" className="block">
                  <Button className="w-full rounded-full bg-[#1a3d2b] hover:bg-[#3a7851] text-white h-12 font-semibold text-base">
                    Khám phá sản phẩm →
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
