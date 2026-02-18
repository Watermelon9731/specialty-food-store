import { db } from "@/lib/db";
import { type ProductInput } from "./schemas";

// export const getProducts = async () => {
//   return await db.product.findMany({
//     include: { category: true },
//     orderBy: { createdAt: "desc" },
//   });
// };

// Mock data
import { Decimal } from "@prisma/client/runtime/library";

const mockProducts = [
  {
    id: "prod_1",
    sku: "MANGO-001",
    name: "Premium Dried Mango",
    description: "Sweet and tangy dried mango slices from Vietnam.",
    pricePerUnit: new Decimal(15.99),
    unitType: "500g",
    stockQuantity: 100,
    origin: "Vietnam",
    shelfLifeDays: 365,
    categoryId: "cat_1",
    createdAt: new Date(),
    updatedAt: new Date(),
    category: {
      id: "cat_1",
      name: "Dried Fruits",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  {
    id: "prod_2",
    sku: "CASHEW-R-001",
    name: "Roasted Cashews",
    description: "Crunchy roasted cashews with a hint of sea salt.",
    pricePerUnit: new Decimal(22.5),
    unitType: "kg",
    stockQuantity: 50,
    origin: "Vietnam",
    shelfLifeDays: 180,
    categoryId: "cat_2",
    createdAt: new Date(),
    updatedAt: new Date(),
    category: {
      id: "cat_2",
      name: "Nuts & Seeds",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  {
    id: "prod_3",
    sku: "PEPPER-B-001",
    name: "Black Pepper Corns",
    description: "Aromatic black pepper corns, perfect for grinding.",
    pricePerUnit: new Decimal(8.99),
    unitType: "200g",
    stockQuantity: 200,
    origin: "Phu Quoc",
    shelfLifeDays: 730,
    categoryId: "cat_3",
    createdAt: new Date(),
    updatedAt: new Date(),
    category: {
      id: "cat_3",
      name: "Spices",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  {
    id: "prod_4",
    sku: "JERKY-B-001",
    name: "Spicy Beef Jerky",
    description: "Traditional marinated beef jerky with chili and lemongrass.",
    pricePerUnit: new Decimal(18.0),
    unitType: "300g",
    stockQuantity: 40,
    origin: "Da Nang",
    shelfLifeDays: 90,
    categoryId: "cat_4",
    createdAt: new Date(),
    updatedAt: new Date(),
    category: {
      id: "cat_4",
      name: "Jerky",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
];

export const getProducts = async () => {
  return mockProducts;
};

// export const getProductBySku = async (sku: string) => {
//   const product = await db.product.findUnique({
//     where: { sku },
//     include: { category: true },
//   });
//   return product;
// };

export const getProductBySku = async (sku: string) => {
  return mockProducts.find((p) => p.sku === sku) || null;
};

// export const createProduct = async (data: ProductInput) => {
//   return await db.product.create({
//     data: {
//       ...data,
//       stockQuantity: data.stockQuantity ?? 0,
//       shelfLifeDays: data.shelfLifeDays ?? 0,
//     },
//   });
// };

export const createProduct = async (data: ProductInput) => {
  return {
    ...data,
    id: `prod_${Math.random().toString(36).substr(2, 9)}`,
    pricePerUnit: new Decimal(data.pricePerUnit),
    stockQuantity: data.stockQuantity ?? 0,
    shelfLifeDays: data.shelfLifeDays ?? 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    category: {
      id: data.categoryId,
      name: "Mock Category",
      createdAt: new Date(),
      updatedAt: new Date(),
    }, // Simplified
  };
};
