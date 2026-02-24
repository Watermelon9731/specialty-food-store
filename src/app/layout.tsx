import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "Tiệm Đồ Khô · Đặc Sản Bình Định",
  description:
    "Đặc sản thủ công từ Bình Định — tré rơm, nem chả, mực khô, hải sản phơi sấy tự nhiên. Không hàn the, không chất bảo quản, gia truyền 3 thế hệ.",
  keywords: [
    "Bình Định",
    "đặc sản",
    "tré rơm",
    "nem chả",
    "mực khô",
    "hải sản khô",
    "Xứ Nẫu",
  ],
  openGraph: {
    title: "Tiệm Đồ Khô · Đặc Sản Bình Định",
    description: "Đặc sản thủ công gia truyền 3 thế hệ từ Bình Định.",
    locale: "vi_VN",
    type: "website",
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
        </Providers>
      </body>
    </html>
  );
}
