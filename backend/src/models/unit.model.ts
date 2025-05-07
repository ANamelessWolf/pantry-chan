import { Schema, Types, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export const BAD_UNIT = {
  id: "00000000-0000-0000-0000-000000000000",
  name: "Error: Unit not found",
  symbol: "x",
  conversionValue: 0,
  category: "Error",
};

export interface IUnit extends Document {
  name: string;
  symbol: string;
  category: string;
  conversionValue: number;
  id: string;
  _id: Types.ObjectId;
}

export interface UnitOutput {
  id: string;
  name: string;
  symbol: string;
  category: string;
  conversionValue: number;
}

export interface ConversionUnit {
  id: Types.ObjectId;
  conversionValue: number;
}

export interface ConversionUnitOutput {
  unit: UnitOutput;
  conversionValue: number;
}

const UnitSchema = new Schema<IUnit>({
  id: { type: String, default: uuidv4, unique: true },
  name: { type: String, unique: true },
  symbol: String,
  category: String,
  conversionValue: Number,
});

export const Unit = model<IUnit>("Unit", UnitSchema);
