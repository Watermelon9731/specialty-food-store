import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getProductsService } from "@/server/products/service";

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
    <div className="flex flex-col min-h-screen">
      <section className="bg-muted/50 py-24 px-4 md:px-6 text-center border-b">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-primary">
            Nature's Finest, <br className="hidden md:inline" /> Dried &
            Delivered
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Discover our premium selection of organic dried fruits, exotic nuts,
            and aromatic spices sourced directly from sustainable farms.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/products">
              <Button
                size="lg"
                className="h-14 px-8 text-lg rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                Explore Collection
              </Button>
            </Link>
            <Link href="/categories">
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg rounded-full hover:bg-background"
              >
                View Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-6 container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Selections</h2>
            <p className="text-muted-foreground">
              Hand-picked favorites for this season.
            </p>
          </div>
          <Link
            href="/products"
            className="text-primary hover:underline font-medium flex items-center group"
          >
            View All Products
            <span className="ml-1 transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>
        <ProductGrid products={featuredProducts} />
      </section>
    </div>
  );
}
