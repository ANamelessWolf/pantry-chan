import { Schema, Types, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { FoodMacrosOutput, FoodMacrosSchema, IFoodMacros } from "./foodMacros.model";
import { FoodCategoryOutput, IFoodCategory } from "./foodCategory.model";
import { ConversionUnitOutput, IUnit, UnitOutput } from "./unit.model";

export interface IFood extends Document {
  id: string;
  _id: Types.ObjectId;
  category: Types.ObjectId;
  name: string;
  portion: {
    value: number;
    unit: Types.ObjectId;
    conversions: {
      unit: Types.ObjectId;
      conversionValue: number;
    }[];
  };
  macros: IFoodMacros;
}

export interface FoodOutput {
  id: string;
  name: string;
  category: FoodCategoryOutput;
  portion: {
    value: number;
    unit: UnitOutput;
    conversions: ConversionUnitOutput[];
  };
  macros: FoodMacrosOutput;
}

const FoodSchema = new Schema<IFood>({
  id: { type: String, default: uuidv4, unique: true },
  category: { type: Schema.Types.ObjectId, ref: 'FoodCategory' },
  name: String,
  portion: {
    value: Number,
    unit: { type: Schema.Types.ObjectId, ref: "Unit" },
    conversions: [
      {
        unit: { type: Schema.Types.ObjectId, ref: "Unit" },
        conversionValue: Number,
      },
    ],
  },
  macros: FoodMacrosSchema,
});

export const Food = model<IFood>("Food", FoodSchema);
