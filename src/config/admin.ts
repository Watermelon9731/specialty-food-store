import {
  BarChart,
  Package,
  ShoppingCart,
  Users,
  LayoutDashboard,
  Settings,
} from "lucide-react";

export const adminNavItems = [
  {
    title: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Inventory",
    href: "/admin/inventory",
    icon: Package,
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: Users,
    disabled: true,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart,
    disabled: true,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
    disabled: true,
  },
];
