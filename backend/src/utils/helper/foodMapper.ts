import { FoodOutput } from "../../models/food.model";
import {
  UnitOutput,
  ConversionUnit,
  ConversionUnitOutput,
  BAD_UNIT,
} from "../../models/unit.model";
import { getUnit, getUnits } from "./unitHelper";
import { BAD_FOOD_CATEGORY, FoodCategoryOutput } from "../../models";

/**
 * Format food category object to a more usable format.
 * If the object is not valid, returns a bad category.
 * @param foodCategory Food category object to format
 * @returns Formatted food category object
 */
const formatCategory = (foodCategory: any): FoodCategoryOutput => {
  try {
    return {
      id: foodCategory.id,
      name: foodCategory.name,
      description: foodCategory.description,
    };
  } catch (error) {
    console.warn("Error formatting category: ", error);
    return BAD_FOOD_CATEGORY;
  }
};

/**
 * Format portion unit object to a more usable format.
 * If the object is not valid, returns a bad unit.
 * @param portionUnit Portion unit object to format
 * @returns Formatted portion unit object
 */
const formatUnit = (portionUnit: any): UnitOutput => {
  try {
    return {
      id: portionUnit.id,
      name: portionUnit.name,
      symbol: portionUnit.symbol,
      conversionValue: portionUnit.conversionValue,
      category: portionUnit.category,
    };
  } catch (error) {
    console.warn("Error formatting portion unit: ", error);
    return BAD_UNIT;
  }
};

/**
 * Format conversion unit object to a more usable format.
 * If the object is not valid, returns a bad unit.
 * @param unitMap Database current units
 * @param conversionUnit Conversion unit object to format
 * @returns Formatted conversion unit object
 */
const formatConversionUnit = (
  unitMap: Map<string, UnitOutput>,
  conversionUnit: ConversionUnit
): ConversionUnitOutput => {
  try {
    const unitId = conversionUnit.id?.toString() ?? "";
    const unit = getUnit(unitMap, unitId);
    return {
      unit,
      conversionValue: conversionUnit.conversionValue,
    };
  } catch (error) {
    console.warn("Error formatting conversion unit: ", error);
    return {
      unit: BAD_UNIT,
      conversionValue: conversionUnit.conversionValue,
    };
  }
};

/**
 * Format conversion units to a more usable format.
 * Bad units are filtered out.
 * @param unitMap Database current units
 * @param units Conversion units array to format
 * @returns Formatted conversion units array
 */
const getConversionUnits = (
  unitMap: Map<string, UnitOutput>,
  units: ConversionUnit[]
): ConversionUnitOutput[] => {
  return units
    .map((conv: ConversionUnit) => {
      return formatConversionUnit(unitMap, conv);
    })
    .filter((conv: ConversionUnitOutput) => {
      return conv.unit.id !== BAD_UNIT.id;
    });
};

/**
 * Map food objects to a more usable format.
 * If the object is not valid, it is skipped.
 * @param foods Food objects to map
 * @returns Mapped food objects array
 */
export const mapFoods = async (foods: any[]): Promise<FoodOutput[]> => {
  const unitMap = await getUnits();
  const mappedFoods: FoodOutput[] = [];
  for (const food of foods) {
    try {
      const macrosUnitId = food.macros?.Portion?.unit?.toString?.() ?? "";
      const macroPortionUnit = getUnit(unitMap, macrosUnitId);

      const mapped: FoodOutput = {
        id: food.id,
        name: food.name,
        category: formatCategory(food.category),
        portion: {
          value: food.portion.value,
          unit: formatUnit(food.portion.unit),
          conversions: getConversionUnits(unitMap, food.portion.conversions),
        },
        macros: {
          Portion: {
            value: food.macros?.Portion?.value,
            unit: macroPortionUnit,
          },
          Calories: food.macros?.Calories || 0,
          TotalFat_g: food.macros?.TotalFat_g || 0,
          SaturatedFat_g: food.macros?.SaturatedFat_g || 0,
          Cholesterol_mg: food.macros?.Cholesterol_mg || 0,
          Sodium_mg: food.macros?.Sodium_mg || 0,
          Potassium_mg: food.macros?.Potassium_mg || 0,
          Carbohydrates_g: food.macros?.Carbohydrates_g || 0,
          DietaryFiber_g: food.macros?.DietaryFiber_g || 0,
          Sugars_g: food.macros?.Sugars_g || 0,
          Protein_g: food.macros?.Protein_g || 0,
          VitaminC_mg: food.macros?.VitaminC_mg || 0,
          Calcium_mg: food.macros?.Calcium_mg || 0,
          Iron_mg: food.macros?.Iron_mg || 0,
          VitaminD_IU: food.macros?.VitaminD_IU || 0,
          VitaminB6_mg: food.macros?.VitaminB6_mg || 0,
          VitaminB12_microg: food.macros?.VitaminB12_microg || 0,
          Magnesium_mg: food.macros?.Magnesium_mg || 0,
        },
      };
      mappedFoods.push(mapped);
    } catch (error) {
      console.error("Error mapping food: ", error);
      continue;
    }
  }

  return mappedFoods;
};
