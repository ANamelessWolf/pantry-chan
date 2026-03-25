import express from 'express';
import foodRoutes from './food.routes';
import foodCategoryRoutes from './foodCategory.routes';
import authRoutes from './auth.routes';
import unitRoutes from './unit.routes';
import inventoryRoutes from './inventory.routes';
import recipeRoutes from './recipe.routes';

const router = express.Router();

router.use('/food', foodRoutes);
router.use('/category', foodCategoryRoutes);
router.use('/auth', authRoutes);
router.use('/unit', unitRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/recipe', recipeRoutes);

export default router;