"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Package,
  ShoppingCart,
  Users,
  LayoutDashboard,
  Settings,
  Store,
} from "lucide-react";
import { PATH } from "@/constants/path";

export const adminNavItems = [
  {
    title: "Tổng quan",
    href: PATH.ADMIN.DASHBOARD,
    icon: LayoutDashboard,
    disabled: false,
  },
  {
    title: "Đơn hàng",
    href: PATH.ADMIN.ORDERS,
    icon: ShoppingCart,
    disabled: false,
  },
  {
    title: "Sản phẩm",
    href: PATH.ADMIN.INVENTORY,
    icon: Package,
    disabled: false,
  },
  {
    title: "Khách hàng",
    href: PATH.ADMIN.CUSTOMERS,
    icon: Users,
    disabled: false,
  },
  {
    title: "Thống kê",
    href: PATH.ADMIN.ANALYTICS,
    icon: BarChart,
    disabled: true,
  },
  {
    title: "Cài đặt",
    href: PATH.ADMIN.SETTINGS,
    icon: Settings,
    disabled: true,
  },
];

interface AdminSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AdminSidebar({ className }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn("pb-12 h-screen border-r bg-muted/40", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 px-4 mb-6">
            <Store className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold tracking-tight">
              Quản lý cửa hàng
            </h2>
          </div>
          <div className="space-y-1">
            {adminNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.disabled ? "#" : item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:bg-muted",
                  item.disabled && "cursor-not-allowed opacity-60",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground uppercase">
            Links
          </h2>
          <div className="space-y-1">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
            >
              <Store className="h-4 w-4" />
              Storefront
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
