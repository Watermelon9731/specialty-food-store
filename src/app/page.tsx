import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getProductsService } from "@/server/products/service";
import {
  ShieldCheck,
  ArrowRight,
  Fish,
  Beef,
  ChefHat,
  Home as HomeIcon,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await getProductsService();

  // Take first 4 products as featured
  const featuredProducts = products.slice(0, 4).map((p) => ({
    id: p.id,
    name: p.name,
    pricePerUnit: Number(p.pricePerUnit),
    unitType: p.unitType,
    stockQuantity: p.stockQuantity,
    origin: p.origin,
    category: p.category ? { name: p.category.name } : undefined,
  }));

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-4 md:px-6 overflow-hidden">
        {/* Background ambient shapes */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[500px] h-[500px] bg-[#3a7851]/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[500px] h-[500px] bg-[#3a7851]/10 rounded-full blur-3xl opacity-50 pointer-events-none" />

        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <Badge className="bg-[#3a7851]/10 text-[#3a7851] hover:bg-[#3a7851]/20 border-none mb-6 px-4 py-1.5 text-sm gap-2">
            <HomeIcon className="h-4 w-4" />
            <span className="font-semibold">Đặc công thức gia truyền</span>
          </Badge>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-8 text-slate-900 dark:text-white leading-[1.1]">
            Hương Vị Quê Nhà <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#3a7851] to-emerald-600">
              Đậm Đà Góc Bếp
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Thưởng thức tinh hoa đặc sản thủ công với hải sản khô ngọt thịt từ
            vùng biển vắng, cùng các loại thịt gác bếp chuẩn vị làm tại nhà.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/products">
              <Button
                size="lg"
                className="w-full sm:w-auto h-14 px-8 text-lg font-semibold rounded-full shadow-lg shadow-[#3a7851]/25 bg-[#3a7851] hover:bg-[#2e6041] hover:-translate-y-1 transition-all text-white"
              >
                Mua Ngay Hôm Nay
              </Button>
            </Link>
            <Link href="/categories">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-14 px-8 text-lg font-semibold rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border-[#3a7851]/20 text-[#3a7851] dark:text-[#52a672] bg-white/50 backdrop-blur-sm dark:bg-slate-900/50"
              >
                Xem Danh Mục
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Commitments / Why Choose Us */}
      <section className="py-24 bg-white dark:bg-slate-900 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Sản Phẩm Của Nhà
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Không sản xuất công nghiệp đại trà, mỗi mẻ cá, mẻ thịt tại Tiệm
              đều được làm thủ công bằng tất cả sự tỉ mỉ.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-[2rem] bg-[#3a7851]/5 dark:bg-[#3a7851]/10 border border-[#3a7851]/20 text-center flex flex-col items-center hover:shadow-xl transition-all hover:-translate-y-1 duration-300">
              <div className="h-20 w-20 bg-[#3a7851]/10 dark:bg-[#3a7851]/20 rounded-2xl flex items-center justify-center mb-6 text-[#3a7851] dark:text-[#52a672] rotate-3 hover:-rotate-3 transition-transform">
                <Fish className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                Hải Sản Đậm Đà
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Mực khô, tôm khô, cá được ướp muối biển tự nhiên, phơi nắng gió
                thủ công đảm bảo từng thớ thịt đều giữ nguyên độ mặn mòi, ngọt
                thơm.
              </p>
            </div>

            <div className="p-8 rounded-[2rem] bg-[#3a7851]/5 dark:bg-[#3a7851]/10 border border-[#3a7851]/20 text-center flex flex-col items-center hover:shadow-xl transition-all hover:-translate-y-1 duration-300">
              <div className="h-20 w-20 bg-[#3a7851]/10 dark:bg-[#3a7851]/20 rounded-2xl flex items-center justify-center mb-6 text-[#3a7851] dark:text-[#52a672] -rotate-3 hover:rotate-3 transition-transform">
                <Beef className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                Đặc Sản Bếp Nhà
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Từng thớ thịt bò, heo, trâu được chính tay nhà ướp với gia vị
                thuần nông, sấy củi chầm chậm để khói ngấm sâu vào từng thớ
                thịt.
              </p>
            </div>

            <div className="p-8 rounded-[2rem] bg-[#3a7851]/5 dark:bg-[#3a7851]/10 border border-[#3a7851]/20 text-center flex flex-col items-center hover:shadow-xl transition-all hover:-translate-y-1 duration-300">
              <div className="h-20 w-20 bg-[#3a7851]/10 dark:bg-[#3a7851]/20 rounded-2xl flex items-center justify-center mb-6 text-[#3a7851] dark:text-[#52a672] rotate-3 hover:-rotate-3 transition-transform">
                <ChefHat className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                Chế Biến Thủ Công
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Sản xuất theo mẻ nhỏ, không sử dụng chất bảo quản hay phẩm màu
                công nghiệp. Hương vị mộc mạc y như món quà từ bàn tay gia đình.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Segment */}
      <section className="py-24 px-4 md:px-6 container mx-auto bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-6">
          <div className="max-w-xl">
            <Badge className="bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300 border-none mb-4 px-3 py-1">
              Best Sellers
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white tracking-tight">
              Sản Phẩm Đang Hot
            </h2>
            <p className="text-muted-foreground text-lg">
              Những gói đặc sản hấp dẫn được khách hàng gửi gắm nhiều niềm tin
              nhất trong thời gian qua.
            </p>
          </div>
          <Link href="/products">
            <Button
              variant="ghost"
              className="text-[#3a7851] font-semibold group h-12 px-6 rounded-full hover:text-[#2e6041] hover:bg-[#3a7851]/10"
            >
              Xem toàn bộ sản phẩm
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        <ProductGrid products={featuredProducts} />
      </section>

      {/* Mini CTA footer segment */}
      <section className="py-16 bg-[#3a7851]/5 border-t border-[#3a7851]/20">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#3a7851]">
            Đem mồi bén về ngay!
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Hương vị nhà làm, đảm bảo hao bia. Thêm ngay vào giỏ hàng những món
            đồ nhắm thủ công tâm huyết nhất từ gia đình chúng tôi.
          </p>
          <Link href="/products">
            <Button
              size="lg"
              className="h-12 px-8 rounded-full bg-[#3a7851] hover:bg-[#2e6041] text-white shadow-lg"
            >
              Bắt Đầu Mua Sắm
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
