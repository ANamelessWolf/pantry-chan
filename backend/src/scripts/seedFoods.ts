import mongoose, { HydratedDocument } from "mongoose";
import { Food } from "../models/food.model";
import { FoodCategory, IFoodCategory } from "../models/foodCategory.model";
import { IUnit, Unit } from "../models/unit.model";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { FoodItemSeed } from "../types/seeder/foodItemSeed";

dotenv.config();

type CatalogMap = {
  categoryMap: Map<string, HydratedDocument<IFoodCategory>>;
  unitMap: Map<string, HydratedDocument<IUnit>>;
};

type ValidationResult = {
  valid: boolean;
  category?: IFoodCategory;
  unit?: IUnit;
  unitMacros?: IUnit;
  message?: string;
};

const dataPath = path.join(__dirname, "../migrations/data/food.json");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Connection failed", err);
    process.exit(1);
  }
};

const initCatalogs = async (): Promise<CatalogMap> => {
  const categories: HydratedDocument<IFoodCategory>[] = await FoodCategory.find(
    {}
  );
  const units: HydratedDocument<IUnit>[] = await Unit.find({});
  console.log(`-- Categories Stored (${categories.length}) --`);
  console.log(`-- Units Stored (${categories.length}) --`);
  const categoryMap = new Map(
    categories.map((cat) => [cat.name.toLowerCase().trim(), cat])
  );
  const unitMap = new Map(
    units.map((unit) => [unit.name.toLowerCase().trim(), unit])
  );
  return { categoryMap, unitMap };
};

const validateItem = (
  item: any,
  categoryMap: Map<string, any>,
  unitMap: Map<string, any>
): ValidationResult => {
  const category: IFoodCategory = categoryMap.get(
    item.category.toLowerCase().trim()
  );
  const unit: IUnit = unitMap.get(item.portion.unit.toLowerCase().trim());
  const unitMacros: IUnit = unitMap.get(
    item.macros.Portion.unit.toLowerCase().trim()
  );

  const missing = [];
  if (!category) missing.push("category");
  if (!unit) missing.push("portion unit");
  if (!unitMacros) missing.push("macros unit");

  if (missing.length > 0) {
    return {
      valid: false,
      message: `⚠️ Skipping: ${item.name} - Missing ${missing.join(", ")}`,
    };
  }

  return { valid: true, category, unit, unitMacros };
};

const saveErrors = (errors: FoodItemSeed[]) => {
  try {
    console.log(`-- Error Items (${errors.length}) --`);

    const now = new Date();
    const filename = `food-error_${now
      .getDate()
      .toString()
      .padStart(2, "0")}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${now.getFullYear()}.json`;
    const errorDir = path.join(__dirname, "../../log/seed-errors");

    // Ensure directory exists
    if (!fs.existsSync(errorDir)) {
      fs.mkdirSync(errorDir, { recursive: true });
    }

    const errorPath = path.join(errorDir, filename);
    fs.writeFileSync(errorPath, JSON.stringify(errors, null, 2), "utf-8");

    console.log(`⚠️ Errors saved to: ${errorPath}`);
  } catch (error) {
    console.error("Error saving errors:", error);
  }
};

const insertFoods = async () => {
  const foodItems: FoodItemSeed[] = JSON.parse(
    fs.readFileSync(dataPath, "utf-8")
  );
  await connectDB();

  const { categoryMap, unitMap } = await initCatalogs();
  const errors: FoodItemSeed[] = [];

  console.log(`-- Inserting --`);
  for (let index = 0; index < foodItems.length; index++) {
    const item = foodItems[index];
    const result = validateItem(item, categoryMap, unitMap);
    const { category, unit, unitMacros } = result;

    if (!result.valid) {
      console.warn(result.message);
      errors.push(item);
      continue;
    } else if (category && unit && unitMacros) {
      try {
        const existing = await Food.findOne({ name: item.name });
        if (existing) {
          console.log(`⏭️ Skipped: "${item.name}" already exists`);
          continue;
        }
        await Food.create({
          name: item.name,
          category: category._id,
          portion: {
            value: item.portion.value,
            unit: unit._id,
            conversions: [],
          },
          macros: {
            ...item.macros,
            Portion: {
              value: item.macros.Portion.value,
              unit: unitMacros._id,
            },
          },
        });
        console.log(`✅ Inserted: ${item.name}`);
      } catch (err) {
        console.error(`❌ Failed to insert ${item.name}`, err);
        errors.push(item);
      }
    }
  }

  if (errors.length > 0) {
    saveErrors(errors);
  }

  mongoose.connection.close();
};

insertFoods();
