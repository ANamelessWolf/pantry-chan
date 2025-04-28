import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { FoodMacrosSchema } from './foodMacros.model';

const RecipeSchema = new Schema({
  id: { type: String, default: uuidv4, unique: true },
  items: [
    {
      food: { type: Schema.Types.ObjectId, ref: 'Food' },
      macros: FoodMacrosSchema,
    },
  ],
  totalMacros: FoodMacrosSchema,
});

export const Recipe = model('Recipe', RecipeSchema);
