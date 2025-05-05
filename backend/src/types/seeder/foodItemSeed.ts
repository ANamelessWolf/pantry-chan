export interface ConversionType {
  unit: string;
  conversionValue: Number;
}

export interface FoodItemSeed {
  name: string;
  category: string;
  portion: {
    value: number;
    unit: string;
    conversions?: ConversionType[];
  };
  macros: {
    Portion: {
      value: number;
      unit: string;
    };
    Calories: number;
    TotalFat_g: number;
    SaturatedFat_g: number;
    Cholesterol_mg: number;
    Sodium_mg: number;
    Potassium_mg: number;
    Carbohydrates_g: number;
    DietaryFiber_g: number;
    Sugars_g: number;
    Protein_g: number;
    VitaminC_mg: number;
    Calcium_mg: number;
    Iron_mg: number;
    VitaminD_IU: number;
    VitaminB6_mg: number;
    VitaminB12_microg: number;
    Magnesium_mg: number;
  };
}
