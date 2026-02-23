"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Plus,
  Package,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AddOrderDialog } from "./AddOrderDialog";

export function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin", icon: LayoutDashboard, label: "Home" },
    { href: "/admin/orders", icon: ShoppingCart, label: "Orders" },
  ];

  const trailingNavItems = [
    { href: "/admin/inventory", icon: Package, label: "Inventory" },
    {
      href: "/admin/settings",
      icon: Settings,
      label: "Settings",
      disabled: true,
    },
  ];

  return (
    <>
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 z-40 flex items-center justify-between px-6 pb-safe safe-area-bottom shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 min-w-12 transition-colors",
                isActive
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-900",
              )}
            >
              <item.icon
                className={cn("h-6 w-6", isActive ? "fill-blue-100" : "")}
              />
              <span className="text-[10px] font-semibold">{item.label}</span>
            </Link>
          );
        })}

        {/* Center Prominent Add Button */}
        <div className="relative -top-5 flex justify-center">
          <AddOrderDialog>
            <button
              className="group flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_8px_16px_rgba(37,99,235,0.4)] transition-transform active:scale-95 hover:-translate-y-1 hover:shadow-[0_12px_20px_rgba(37,99,235,0.5)] border-4 border-white"
              aria-label="Add Order"
            >
              <Plus
                className="h-6 w-6 transition-transform group-hover:scale-110"
                strokeWidth={3}
              />
            </button>
          </AddOrderDialog>
        </div>

        {trailingNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 min-w-12 transition-colors",
                isActive
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-900",
                item.disabled && "opacity-50 cursor-not-allowed",
              )}
            >
              <item.icon
                className={cn("h-6 w-6", isActive ? "fill-blue-100" : "")}
              />
              <span className="text-[10px] font-semibold">{item.label}</span>
            </Link>
          );
        })}
      </div>
      {/* Spacer so content is not hidden behind the bottom bar */}
      <div className="h-20 w-full md:hidden" aria-hidden="true" />
    </>
  );
}
