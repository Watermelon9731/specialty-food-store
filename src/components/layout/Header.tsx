"use client";

import Link from "next/link";
import { ShoppingBag, Menu, Fish, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/hooks/use-cart";
import { useEffect, useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"; // If available, otherwise create a simplified version or use sr-only class

export function Header() {
  const { items, setOpen } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const itemCount = isMounted
    ? items.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="mr-6 flex items-center space-x-2.5 group">
          <div className="bg-[#3a7851] p-1.5 rounded-lg text-white shadow-sm group-hover:bg-[#2e6041] transition-colors">
            <Fish className="h-5 w-5" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white hidden sm:inline-block">
            Tiệm Đồ Khô
          </span>
          <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white sm:hidden">
            Tiệm Đồ Khô
          </span>
        </Link>
        <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold">
          <Link
            href="/products"
            className="transition-colors hover:text-[#3a7851] text-slate-600 dark:text-slate-300"
          >
            Sản phẩm
          </Link>
          <Link
            href="/categories"
            className="transition-colors hover:text-[#3a7851] text-slate-600 dark:text-slate-300"
          >
            Danh mục
          </Link>
          <Link
            href="/about"
            className="transition-colors hover:text-[#3a7851] text-slate-600 dark:text-slate-300"
          >
            Liên hệ
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-3">
          <Button
            variant="outline"
            size="icon"
            className="relative rounded-full border-slate-200 hover:bg-slate-100 hover:text-[#3a7851] dark:border-slate-800 dark:hover:bg-slate-800"
            onClick={() => setOpen(true)}
            aria-label="Open Cart"
          >
            <ShoppingBag className="h-4 w-4" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center animate-in zoom-in shadow-sm border-2 border-white dark:border-slate-950">
                {itemCount}
              </span>
            )}
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0 w-[300px] border-r-0">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <Link href="/" className="flex items-center space-x-2.5 mb-10">
                <div className="bg-[#3a7851] p-1.5 rounded-lg text-white shadow-sm">
                  <Fish className="h-5 w-5" />
                </div>
                <span className="font-extrabold text-xl tracking-tight">
                  Tiệm Đồ Khô
                </span>
              </Link>
              <nav className="flex flex-col space-y-4">
                <Link href="/products" className="text-lg font-medium">
                  Sản phẩm
                </Link>
                <Link href="/categories" className="text-lg font-medium">
                  Danh mục
                </Link>
                <Link href="/about" className="text-lg font-medium">
                  Liên hệ
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
