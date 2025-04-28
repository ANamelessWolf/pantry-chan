import { Request, Response } from 'express';
import { Food } from '../models/food.model';

export const getAllFoods = async (req: Request, res: Response) => {
  const foods = await Food.find();
  res.json(foods);
};

export const createFood = async (req: Request, res: Response) => {
  const food = new Food(req.body);
  await food.save();
  res.status(201).json(food);
};
