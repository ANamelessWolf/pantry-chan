import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const FoodCategorySchema = new Schema({
  id: { type: String, default: uuidv4, unique: true },
  name: String,
  description: String,
});

export const FoodCategory = model('FoodCategory', FoodCategorySchema);
