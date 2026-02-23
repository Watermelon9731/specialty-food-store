import { Fish } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="container px-4 md:px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="bg-[#3a7851] p-1.5 rounded-lg text-white shadow-sm">
              <Fish className="h-5 w-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
              Tiệm Đồ Khô
            </span>
          </Link>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Hương vị nhà làm, đậm đà tình quê. Cung cấp các loại đặc sản thủ
            công, hải sản khô và thịt gác bếp tuyển chọn.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-4 text-slate-900 dark:text-white">
            Cửa Hàng
          </h3>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li>
              <Link
                href="/products?category=seafood"
                className="hover:text-[#3a7851] transition-colors"
              >
                Hải Sản Khô
              </Link>
            </li>
            <li>
              <Link
                href="/products?category=meat"
                className="hover:text-[#3a7851] transition-colors"
              >
                Thịt Gác Bếp
              </Link>
            </li>
            <li>
              <Link
                href="/products?category=spices"
                className="hover:text-[#3a7851] transition-colors"
              >
                Gia Vị Truyền Thống
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4 text-slate-900 dark:text-white">
            Công Ty
          </h3>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li>
              <Link
                href="/about"
                className="hover:text-[#3a7851] transition-colors"
              >
                Về Chúng Tôi
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-[#3a7851] transition-colors"
              >
                Liên Hệ
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4 text-slate-900 dark:text-white">
            Pháp Lý
          </h3>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li>
              <Link
                href="/terms"
                className="hover:text-[#3a7851] transition-colors"
              >
                Điều Khoản
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:text-[#3a7851] transition-colors"
              >
                Bảo Mật
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container px-4 md:px-6 py-6 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-600 dark:text-slate-400">
        &copy; {new Date().getFullYear()} Tiệm Đồ Khô. All rights reserved.
      </div>
    </footer>
  );
}
