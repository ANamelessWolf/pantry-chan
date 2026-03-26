import express from "express";
import {
  createFood,
  deleteFood,
  getAllFoods,
  getFoodById,
  updateFood,
  uploadFoodImageHandler,
} from "../controllers/food.controller";
import { uploadFoodImage } from "../middleware/upload.middleware";

const router = express.Router();

router.get("/", getAllFoods);
router.get("/:id", getFoodById);
router.post("/", createFood);
router.put("/:id", updateFood);
router.delete("/:id", deleteFood);
router.post("/:id/image", uploadFoodImage.single("image"), uploadFoodImageHandler);

export default router;
