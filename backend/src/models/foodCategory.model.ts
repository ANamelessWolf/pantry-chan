import { Schema, Types, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export const BAD_FOOD_CATEGORY = {
  id: "00000000-0000-0000-0000-000000000000",
  name: "Bad Food Category",
  description: "Error: Food Category not found",
};

export interface IFoodCategory extends Document {
  name: string;
  description: string;
  id: string;
  _id: Types.ObjectId;
}

export interface FoodCategoryOutput {
  name: string;
  description: string;
  id: string;
}

const FoodCategorySchema = new Schema<IFoodCategory>({
  id: { type: String, default: uuidv4, unique: true },
  name: { type: String, unique: true },
  description: String,
});

export const FoodCategory = model<IFoodCategory>(
  "FoodCategory",
  FoodCategorySchema
);
