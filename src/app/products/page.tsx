import { getProductsService } from "@/server/products/service";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Suspense } from "react";

export const dynamic = "force-dynamic"; // Ensure fresh data on each request

export default async function ProductsPage() {
  const products = await getProductsService();

  const formattedProducts = products.map((p) => ({
    id: p.id,
    name: p.name,
    pricePerUnit: Number(p.pricePerUnit),
    unitType: p.unitType,
    stockQuantity: p.stockQuantity,
    origin: p.origin,
    category: p.category ? { name: p.category.name } : undefined,
  }));

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="flex flex-col space-y-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Our Collection</h1>
        <p className="text-muted-foreground text-lg">
          Browse our premium selection of dried fruits, nuts, and spices.
        </p>
      </div>
      <Suspense
        fallback={
          <div className="h-96 flex items-center justify-center">
            Loading products...
          </div>
        }
      >
        <ProductGrid products={formattedProducts} />
      </Suspense>
    </div>
  );
}
