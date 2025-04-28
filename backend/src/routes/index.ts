import express from 'express';
import { getAllFoods, createFood } from '../controllers/food.controller';

const router = express.Router();

router.get('/food', getAllFoods);
router.post('/food', createFood);

export default router;
