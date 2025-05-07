import { Schema } from "mongoose";
import { IUnit, UnitOutput } from "./unit.model";

export interface IFoodMacros {
  Portion: {
    value: Number;
    unit: IUnit;
  };
  Calories: Number;
  TotalFat_g: Number;
  SaturatedFat_g: Number;
  Cholesterol_mg: Number;
  Sodium_mg: Number;
  Potassium_mg: Number;
  Carbohydrates_g: Number;
  DietaryFiber_g: Number;
  Sugars_g: Number;
  Protein_g: Number;
  VitaminC_mg: Number;
  Calcium_mg: Number;
  Iron_mg: Number;
  VitaminD_IU: Number;
  VitaminB6_mg: Number;
  VitaminB12_microg: Number;
  Magnesium_mg: Number;
}

export interface FoodMacrosOutput {
  Portion: {
    value: Number;
    unit: UnitOutput;
  };
  Calories: Number;
  TotalFat_g: Number;
  SaturatedFat_g: Number;
  Cholesterol_mg: Number;
  Sodium_mg: Number;
  Potassium_mg: Number;
  Carbohydrates_g: Number;
  DietaryFiber_g: Number;
  Sugars_g: Number;
  Protein_g: Number;
  VitaminC_mg: Number;
  Calcium_mg: Number;
  Iron_mg: Number;
  VitaminD_IU: Number;
  VitaminB6_mg: Number;
  VitaminB12_microg: Number;
  Magnesium_mg: Number;
}

export const FoodMacrosSchema = new Schema({
  Portion: {
    value: Number,
    unit: { type: Schema.Types.Mixed },
  },
  Calories: Number,
  TotalFat_g: Number,
  SaturatedFat_g: Number,
  Cholesterol_mg: Number,
  Sodium_mg: Number,
  Potassium_mg: Number,
  Carbohydrates_g: Number,
  DietaryFiber_g: Number,
  Sugars_g: Number,
  Protein_g: Number,
  VitaminC_mg: Number,
  Calcium_mg: Number,
  Iron_mg: Number,
  VitaminD_IU: Number,
  VitaminB6_mg: Number,
  VitaminB12_microg: Number,
  Magnesium_mg: Number,
});
