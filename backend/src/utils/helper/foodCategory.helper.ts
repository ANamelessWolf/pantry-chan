import { FoodCategory } from "../../models";

/**
 * Get the food category ID from the database using a string category ID.
 * @param categoryId The string ID of the food category.
 * @returns The ObjectId of the food category.
 * @throws Error if the category ID is invalid or not found.
 */
export const getFoodCategoryId = async (categoryId: string) => {
  const catDoc = await FoodCategory.findOne({ id: categoryId });
  if (!catDoc) {
    throw new Error("Invalid category ID");
  }
  return catDoc._id;
};
