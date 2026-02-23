import { db } from "@/lib/db";
import { type CategoryInput } from "./schemas";

export const getCategories = async () => {
  return await db.category.findMany({
    orderBy: { name: "asc" },
  });
};

export const createCategory = async (data: CategoryInput) => {
  return await db.category.create({
    data,
  });
};
