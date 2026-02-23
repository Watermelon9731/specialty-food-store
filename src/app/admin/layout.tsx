"use client";

import { AdminSidebar } from "@/components/admin/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden w-64 md:block border-r bg-muted/40 shrink-0">
        <AdminSidebar />
      </div>
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="flex h-16 items-center border-b px-6 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 shrink-0">
          <div className="flex items-center gap-2 md:hidden">
            {/* Mobile Toggle would go here */}
            <span className="font-bold">Admin Portal</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
              AD
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
