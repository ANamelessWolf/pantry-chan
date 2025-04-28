import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const UserSchema = new Schema({
  id: { type: String, default: uuidv4, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const User = model('User', UserSchema);
