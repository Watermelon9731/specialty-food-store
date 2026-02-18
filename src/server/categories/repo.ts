import { db } from "@/lib/db";
import { type CategoryInput } from "./schemas";

// export const getCategories = async () => {
//   return await db.category.findMany({
//     orderBy: { name: "asc" },
//   });
// };

// Mock data for demo
export const getCategories = async () => {
  return [
    {
      id: "cat_1",
      name: "Dried Fruits",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "cat_2",
      name: "Nuts & Seeds",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "cat_3",
      name: "Spices",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "cat_4",
      name: "Jerky",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "cat_5",
      name: "Herbs",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
};

// export const createCategory = async (data: CategoryInput) => {
//   return await db.category.create({
//     data,
//   });
// };

export const createCategory = async (data: CategoryInput) => {
  return {
    id: `cat_${Math.random().toString(36).substr(2, 9)}`,
    name: data.name,
    products: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};
