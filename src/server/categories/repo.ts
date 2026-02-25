import { db } from "@/lib/db";
import { type CategoryInput } from "./schemas";

export const getCategories = async () => {
  const { data, error } = await db
    .from("Category")
    .select("*")
    .order("name", { ascending: true });
  if (error) throw error;
  return data ?? [];
};

export const createCategory = async (data: CategoryInput) => {
  const { data: category, error } = await db
    .from("Category")
    .insert(data)
    .select()
    .single();
  if (error) throw error;
  return category;
};
