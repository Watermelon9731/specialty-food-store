import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liên Hệ | Tré Bà Liên",
  description:
    "Chúng tôi luôn sẵn sàng tư vấn, giải đáp mọi thắc mắc về sản phẩm và đơn hàng của bạn.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
