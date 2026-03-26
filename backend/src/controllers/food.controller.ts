import { NextFunction, Request, Response } from "express";
import { Food, IFood } from "../models/food.model";
import { HydratedDocument } from "mongoose";
import { mapFoods } from "../utils/helper/foodMapper";
import {
  CompareTypeEnum,
  MacroEvaluationType,
} from "../types/common/compareTypeEnum";
import { getFoodCategoryId } from "../utils/helper/foodCategory.helper";
import { getUnitObjectId } from "../utils/helper/unitHelper";
import { Exception } from "../config/exeption";
import { HTTP_STATUS } from "../config/constants";
import { asyncErrorHandler } from "../middleware/error-handler.middleware";
import { HttpResponse } from "../config/http-response";
import path from "path";
import fs from "fs";

export const DEFAULT_PAGINATION_LIMIT = 10;

const FOOD_POPULATE = [
  { path: "category" },
  { path: "portion.unit" },
];

export const getAllFoods = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { category, search, pageIndex, pageSize } = req.query;
      let macros: MacroEvaluationType[] = [];
      if (typeof req.query.macros === "string") {
        macros = JSON.parse(req.query.macros);
      }

      const filter: any = {};

      if (category) {
        filter.category = await getFoodCategoryId(category as string);
      }
      if (search) filter.name = { $regex: search as string, $options: "i" };

      for (const condition of macros) {
        if (!condition.key || condition.compare === CompareTypeEnum.None)
          continue;
        const field = `macros.${condition.key}`;
        switch (condition.compare) {
          case CompareTypeEnum.Equal:
            filter[field] = condition.value;
            break;
          case CompareTypeEnum.LessThan:
            filter[field] = { $lt: condition.value };
            break;
          case CompareTypeEnum.MoreThan:
            filter[field] = { $gt: condition.value };
            break;
        }
      }

      // Fix: build the query once, populate directly — no duplicate .find()
      let query = Food.find(filter).populate(FOOD_POPULATE);

      if (pageIndex && pageSize) {
        const pageIndexValue = parseInt(pageIndex as string) || 0;
        const limit = parseInt(pageSize as string) || DEFAULT_PAGINATION_LIMIT;
        const skip = (pageIndexValue > 0 ? pageIndexValue - 1 : 0) * limit;
        query = query.skip(skip).limit(limit) as typeof query;
      }

      const foods = (await query.exec()) as IFood[];
      const result = await mapFoods(foods);

      res.status(HTTP_STATUS.OK).json(
        new HttpResponse({
          data: result,
          success: true,
          message: "Foods retrieved successfully",
        })
      );
    } catch (error: any) {
      return next(
        new Exception(
          `An error occurred getting all foods.`,
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          error
        )
      );
    }
  }
);

export const getFoodById = async (req: Request, res: Response) => {
  try {
    // Fix: find by UUID id field, populate before mapping
    const food = await Food.findOne({ id: req.params.id })
      .populate(FOOD_POPULATE) as IFood | null;
    if (!food) {
      res.status(404).json({ message: "Food not found" });
      return;
    }
    const result = await mapFoods([food]);
    res.json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createFood = async (req: Request, res: Response) => {
  try {
    const requiredFields = ["name", "category", "portion", "macros"];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        res.status(400).json({ message: `Missing field: ${field}` });
        return;
      }
    }

    const body = { ...req.body };

    // Resolve UUID → ObjectId for category and portion.unit
    body.category = await getFoodCategoryId(body.category);
    body.portion = {
      ...body.portion,
      unit: await getUnitObjectId(body.portion.unit),
    };

    const food = new Food(body);
    await food.save();

    // Populate and map so the response matches FoodOutput shape
    await food.populate(FOOD_POPULATE);
    const result = await mapFoods([food as unknown as IFood]);
    res.status(201).json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateFood = async (req: Request, res: Response) => {
  try {
    const body = { ...req.body };

    // Resolve UUID → ObjectId for category and portion.unit if provided
    if (body.category) {
      body.category = await getFoodCategoryId(body.category);
    }
    if (body.portion?.unit) {
      body.portion = {
        ...body.portion,
        unit: await getUnitObjectId(body.portion.unit),
      };
    }

    // Fix: find by UUID id field, populate before mapping
    const food = await Food.findOneAndUpdate({ id: req.params.id }, body, {
      new: true,
    }).populate(FOOD_POPULATE) as IFood | null;

    if (!food) {
      res.status(404).json({ message: "Food not found" });
      return;
    }
    const result = await mapFoods([food]);
    res.json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteFood = async (req: Request, res: Response) => {
  try {
    // Fix: find by UUID id field, not MongoDB _id
    const food = await Food.findOneAndDelete({ id: req.params.id });
    if (!food) {
      res.status(404).json({ message: "Food not found" });
      return;
    }
    // Remove image file if it exists
    if (food.imagePath) {
      const imgPath = path.join(process.cwd(), "media", "food", food.imagePath);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const uploadFoodImageHandler = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        return next(
          new Exception("No image file provided", HTTP_STATUS.BAD_REQUEST, null)
        );
      }

      const ext = path.extname(req.file.originalname).toLowerCase() || ".jpg";
      const imagePath = `${req.params.id}${ext}`;

      // Delete previous image if extension differs
      const existing = await Food.findOne({ id: req.params.id });
      if (existing?.imagePath && existing.imagePath !== imagePath) {
        const oldPath = path.join(process.cwd(), "media", "food", existing.imagePath);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      const food = (await Food.findOneAndUpdate(
        { id: req.params.id },
        { imagePath },
        { new: true }
      ).populate(FOOD_POPULATE)) as IFood | null;

      if (!food) {
        fs.unlinkSync(req.file.path);
        return next(new Exception("Food not found", HTTP_STATUS.NOT_FOUND, null));
      }

      const result = await mapFoods([food]);
      res.status(HTTP_STATUS.OK).json(
        new HttpResponse({
          data: result[0],
          success: true,
          message: "Image uploaded successfully",
        })
      );
    } catch (error: any) {
      return next(
        new Exception(
          "Error uploading image",
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          error
        )
      );
    }
  }
);
