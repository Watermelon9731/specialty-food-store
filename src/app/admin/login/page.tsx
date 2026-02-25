"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { PATH } from "@/constants/path";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError("Vui lòng nhập mật khẩu.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${PATH.AUTH.LOGIN}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Đăng nhập thất bại.");
      }

      router.push(PATH.ADMIN.DASHBOARD);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a3d2b] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background dots */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link
            href={PATH.HOME}
            className="inline-flex flex-col items-center gap-2 group"
          >
            <div className="bg-white/10 group-hover:bg-[#3a7851] p-3.5 rounded-2xl text-white transition-all duration-200">
              <ChefHat className="h-7 w-7" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              Tré Bà Liên
            </span>
            <span className="text-emerald-400 text-xs font-semibold tracking-[0.15em] uppercase">
              Quản lý hệ thống
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-[2rem] p-8 shadow-2xl shadow-black/30">
          <div className="flex items-center gap-3 mb-7">
            <div className="h-11 w-11 bg-[#1a3d2b] rounded-xl flex items-center justify-center text-white">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Đăng nhập Admin
              </h1>
              <p className="text-slate-500 text-sm">
                Chỉ dành cho quản trị viên.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="font-semibold text-slate-700"
              >
                Mật khẩu
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-12 rounded-xl border-slate-200 focus-visible:ring-[#3a7851] text-base"
                autoFocus
              />
            </div>

            {error && (
              <div className="text-sm font-semibold text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-full bg-[#1a3d2b] hover:bg-[#3a7851] text-white font-bold text-base transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang xác minh...
                </>
              ) : (
                "Đăng nhập →"
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-emerald-400/60 text-xs mt-6">
          © {new Date().getFullYear()} Tré Bà Liên · Bình Định
        </p>
      </div>
    </div>
  );
}
