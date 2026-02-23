"use client";

import { usePathname, useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/Sidebar";
import { LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") {
    return <div className="min-h-screen w-full">{children}</div>;
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden w-64 md:block border-r bg-muted/40 shrink-0">
        <AdminSidebar />
      </div>
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="flex h-16 items-center border-b px-6 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 shrink-0 justify-between">
          <div className="flex items-center gap-2 md:hidden">
            <span className="font-bold">Admin Portal</span>
          </div>
          <div className="hidden md:flex" />
          <div className="ml-auto flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-900 text-xs font-bold border border-amber-200">
              AD
            </div>
            <button
              onClick={handleLogout}
              className="text-stone-500 hover:text-stone-900 p-2 transition-colors flex items-center gap-2 text-sm font-medium"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6 bg-stone-50/50">
          {children}
        </main>
      </div>
    </div>
  );
}
