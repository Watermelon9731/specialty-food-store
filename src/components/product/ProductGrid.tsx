"use client";

import { motion } from "framer-motion";
import {
  ProductCard,
  ProductCardProps,
} from "@/components/product/ProductCard";

interface ProductGridProps {
  products: ProductCardProps["product"][];
}

const staggeredVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-12 col-span-full">
        No products found.
      </div>
    );
  }

  return (
    <motion.div
      variants={staggeredVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={itemVariants}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}
