import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { FoodMacrosSchema } from './foodMacros.model';

const FoodSchema = new Schema({
  id: { type: String, default: uuidv4, unique: true },
  name: String,
  portion: {
    value: Number,
    unit: { type: Schema.Types.Mixed },
  },
  macros: FoodMacrosSchema,
});

export const Food = model('Food', FoodSchema);
