import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const InventorySchema = new Schema({
  id: { type: String, default: uuidv4, unique: true },
  food: { type: Schema.Types.ObjectId, ref: 'Food' },
  quantity: {
    value: Number,
    unit: { type: Schema.Types.Mixed },
  },
});

export const Inventory = model('Inventory', InventorySchema);
