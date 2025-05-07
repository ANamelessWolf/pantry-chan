import express from "express";
import {
  createFood,
  deleteFood,
  getAllFoods,
  getFoodById,
  updateFood,
} from "../controllers/food.controller";

const router = express.Router();

router.get("/", getAllFoods);
router.get("/:id", getFoodById);
router.post("/", createFood);
router.put("/:id", updateFood);
router.delete("/:id", deleteFood);

export default router;
