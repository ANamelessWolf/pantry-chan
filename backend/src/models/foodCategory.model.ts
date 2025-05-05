import { Schema, Types, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IFoodCategory extends Document {
  name: string;
  description: string;
  id: string;
  _id: Types.ObjectId;
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
