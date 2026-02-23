import Link from "next/link";
import { getCategoriesService } from "@/server/categories/service";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = await getCategoriesService();

  return (
    <div className="container py-12 px-4 md:px-6">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Browse by Category
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {categories.map((category) => (
          <Link
            href={`/products?category=${category.name.toLowerCase()}`}
            key={category.id}
            className="group relative block aspect-square md:aspect-4/3 overflow-hidden rounded-xl bg-card border hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <h3 className="text-2xl font-bold text-white group-hover:scale-105 transition-transform origin-left drop-shadow-md">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
        {categories.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No categories found.
          </div>
        )}
      </div>
    </div>
  );
}
