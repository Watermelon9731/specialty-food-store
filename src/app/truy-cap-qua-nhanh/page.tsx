import type { Metadata } from "next";
import Link from "next/link";
import { PATH } from "@/constants/path";

export const metadata: Metadata = {
  title: "Bạn đang truy cập quá nhanh",
  description: "Hệ thống đang tạm giới hạn truy cập để bảo vệ dịch vụ.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RateLimitNoticePage() {
  return (
    <div className="min-h-screen bg-[#f8f7f4] pt-28 pb-20 px-4">
      <div className="mx-auto max-w-2xl rounded-3xl border border-amber-200 bg-white p-8 md:p-10 text-center shadow-sm">
        <div className="inline-flex items-center justify-center rounded-full bg-amber-100 text-amber-700 px-4 py-1 text-xs font-semibold uppercase tracking-widest mb-5">
          Thông báo truy cập
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
          Bạn đang truy cập quá nhanh, hãy chậm lại.
        </h1>
        <p className="text-slate-600 leading-relaxed mb-8">
          Hệ thống đang tạm giới hạn để bảo vệ website khỏi lưu lượng bất thường.
          Vui lòng thử lại sau khoảng 1 phút.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={PATH.BLOG.ALL}
            className="inline-flex items-center justify-center rounded-full bg-[#3a7851] px-6 py-3 text-sm font-bold text-white hover:bg-[#2f6342] transition-colors"
          >
            Quay lại trang Tin tức
          </Link>
          <Link
            href={PATH.HOME}
            className="inline-flex items-center justify-center rounded-full bg-slate-100 px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-200 transition-colors"
          >
            Về Trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
