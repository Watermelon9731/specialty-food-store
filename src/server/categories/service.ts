import { createCategory, getCategories } from "./repo";
import { type CategoryInput } from "./schemas";

export const getCategoriesService = async () => {
  return await getCategories();
};

export const createCategoryService = async (data: CategoryInput) => {
  return await createCategory(data);
};
