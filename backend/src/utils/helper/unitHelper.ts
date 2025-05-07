import { HydratedDocument } from "mongoose";
import { IUnit, Unit, UnitOutput } from "../../models";

/**
 * Fetches all units from the database and returns them as a Map.
 */
export const getUnits = async (): Promise<Map<string, UnitOutput>> => {
  const units: HydratedDocument<IUnit>[] = await Unit.find({});
  const unitMap = new Map<string, UnitOutput>(
    units.map((unit) => [unit._id.toString(), unit.toObject()])
  );
  return unitMap;
};

/**
 *
 * @param unitMap Database current units
 * @param key Unit key to search for
 * @returns UnitOutput object if found, otherwise throws an error
 * @throws Error if the unit is not found in the map
 */
export const getUnit = (
  unitMap: Map<string, UnitOutput>,
  key: string
): UnitOutput => {
  const unit = unitMap.get(key);
  if (!unit) {
    throw new Error(`Unit with key ${key} is not defined`);
  }
  return {
    id: unit.id,
    name: unit.name,
    symbol: unit.symbol,
    conversionValue: unit.conversionValue,
    category: unit.category,
  };
};
