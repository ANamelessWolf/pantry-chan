import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const UnitSchema = new Schema({
  id: { type: String, default: uuidv4, unique: true },
  name: String,
  symbol: String,
  category: String,
  conversionValue: Number,
});

export const Unit = model('Unit', UnitSchema);
