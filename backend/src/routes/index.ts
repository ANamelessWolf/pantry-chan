import express from 'express';
import foodRoutes from './food.routes';

const router = express.Router();

router.use('/food', foodRoutes); 

export default router;