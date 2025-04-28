import { connectDB } from '../config/db';
import { FoodCategory } from '../models/foodCategory.model';
import { Unit } from '../models/unit.model';
import categories from './data/categories.json';
import units from './data/units.json';

const runMigrations = async () => {
  await connectDB();

  await FoodCategory.deleteMany(); // optional: clean before insert
  await FoodCategory.insertMany(categories);

  await Unit.deleteMany(); // optional: clean before insert
  await Unit.insertMany(units);

  console.log('Migration complete');
  process.exit(0);
};

runMigrations();
