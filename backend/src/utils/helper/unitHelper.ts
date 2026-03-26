import { HydratedDocument } from "mongoose";
import { IUnit, Unit, UnitOutput, BAD_UNIT } from "../../models";

/**
 * Get the MongoDB ObjectId of a unit from its UUID id field.
 */
export const getUnitObjectId = async (unitId: string) => {
  const unitDoc = await Unit.findOne({ id: unitId });
  if (!unitDoc) throw new Error(`Unit not found: ${unitId}`);
  return unitDoc._id;
};

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
  if (!key) return BAD_UNIT;
  const unit = unitMap.get(key);
  if (!unit) return BAD_UNIT;
  return {
    id: unit.id,
    name: unit.name,
    symbol: unit.symbol,
    conversionValue: unit.conversionValue,
    category: unit.category,
  };
};
