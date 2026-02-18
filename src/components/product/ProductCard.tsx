"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Plus, Check } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export interface ProductCardProps {
  product: {
    id: string;
    name: string;
    pricePerUnit: number;
    unitType: string;
    stockQuantity: number;
    origin: string;
    category?: { name: string };
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.pricePerUnit,
      quantity: 1,
      unitType: product.unitType,
      stock: product.stockQuantity,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }} // Subtle lift
      className="group relative flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md"
    >
      <div className="aspect-square relative overflow-hidden bg-muted flex items-center justify-center">
        <span className="text-4xl opacity-50">🥜</span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold leading-none tracking-tight">
              {product.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-1 capitalize">
              {product.origin} • {product.category?.name}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-primary">
              ${product.pricePerUnit.toFixed(2)}
            </span>
            <span className="text-xs text-muted-foreground">
              per {product.unitType}
            </span>
          </div>
          <Button
            size="icon"
            onClick={handleAdd}
            variant={isAdded ? "secondary" : "default"}
            className={`transition-all rounded-full h-10 w-10 ${isAdded ? "bg-green-100 text-green-700 hover:bg-green-200" : ""}`}
            disabled={product.stockQuantity <= 0}
          >
            {isAdded ? (
              <Check className="h-5 w-5" />
            ) : (
              <Plus className="h-5 w-5" />
            )}
            <span className="sr-only">Add to Cart</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
