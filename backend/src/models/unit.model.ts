import { Schema, Types, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IUnit extends Document {
  name: string;
  symbol: string;
  category: string;
  conversionValue: number;
  id: string;
  _id: Types.ObjectId;
}

const UnitSchema = new Schema<IUnit>({
  id: { type: String, default: uuidv4, unique: true },
  name: { type: String, unique: true },
  symbol: String,
  category: String,
  conversionValue: Number,
});

export const Unit = model<IUnit>("Unit", UnitSchema);
