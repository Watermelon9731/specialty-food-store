import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { FloatingContact } from "@/components/layout/FloatingContact";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://trebinhdinh.com",
  ),
  title: {
    default: "Tré Bà Liên | Đặc sản Tré Rơm & Chả Nem Bình Định Chính Gốc",
    template: "%s | Tré Bà Liên",
  },
  description:
    "Thưởng thức tinh hoa ẩm thực Xứ Nẫu với Tré rơm Bình Định gia truyền. Nguyên liệu tươi sạch, lên men tự nhiên bằng lá ổi, không hàn the, không chất bảo quản. Giao hàng toàn quốc.",
  keywords: [
    "Tré Bình Định",
    "Tré rơm",
    "Tré Bà Liên",
    "đặc sản Bình Định",
    "nem chả Bình Định",
    "chả ram tôm đất",
    "tré trộn",
    "mực khô",
    "hải sản Quy Nhơn",
    "đặc sản Xứ Nẫu",
  ],
  authors: [{ name: "Tré Bà Liên" }],
  creator: "Tré Bà Liên",
  publisher: "Tré Bà Liên",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Tré Bà Liên | Đặc sản Tré Rơm Bình Định Chính Gốc",
    description:
      "Thưởng thức tinh hoa ẩm thực Xứ Nẫu với Tré rơm Bình Định gia truyền. Không hàn the, không chất bảo quản. Giao hàng toàn quốc.",
    url: "/",
    siteName: "Tré Bà Liên",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // TBD: needs a real preview image
        width: 1200,
        height: 630,
        alt: "Tré Bà Liên - Đặc sản Bình Định",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tré Bà Liên | Đặc sản Tré Rơm Bình Định Chính Gốc",
    description:
      "Thưởng thức tinh hoa ẩm thực Xứ Nẫu với Tré rơm Bình Định gia truyền. Không hàn the, không chất bảo quản.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${geist.variable} font-sans antialiased`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <CartDrawer />
          <FloatingContact />
        </Providers>
      </body>
    </html>
  );
}
