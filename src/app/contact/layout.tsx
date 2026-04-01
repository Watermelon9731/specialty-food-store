import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liên Hệ Đặt Hàng Đặc Sản Bình Định",
  description:
    "Liên hệ Tré Bà Liên để đặt hàng đặc sản Bình Định, tư vấn số lượng, báo giá nhanh và hỗ trợ giao hàng toàn quốc.",
  alternates: {
    canonical: "/lien-he",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
