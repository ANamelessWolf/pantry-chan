import { NextFunction, Request, Response } from "express";
import { Food, IFood } from "../models/food.model";
import { HydratedDocument } from "mongoose";
import { mapFoods } from "../utils/helper/foodMapper";
import {
  CompareTypeEnum,
  MacroEvaluationType,
} from "../types/common/compareTypeEnum";
import { getFoodCategoryId } from "../utils/helper/foodCategory.helper";
import { Exception } from "../config/exeption";
import { HTTP_STATUS } from "../config/constants";
import { asyncErrorHandler } from "../middleware/error-handler.middleware";
import { HttpResponse } from "../config/http-response";

export const DEFAULT_PAGINATION_LIMIT = 10;

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

      let query = Food.find(filter);

      if (pageIndex && pageSize) {
        const pageIndexValue = parseInt(pageIndex as string) || 0;
        const limit = parseInt(pageSize as string) || DEFAULT_PAGINATION_LIMIT;
        const skip = (pageIndexValue > 0 ? pageIndexValue - 1 : 0) * limit;
        query = query.skip(skip).limit(limit);
      }

      const foods = (await query
        .find()
        .populate([
          { path: "category" },
          { path: "portion.unit" },
        ])) as IFood[];

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
    const food = await Food.findById(req.params.id);
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

    const food = new Food(req.body);
    await food.save();
    res.status(201).json(food);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateFood = async (req: Request, res: Response) => {
  try {
    const food = await Food.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
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
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) {
      res.status(404).json({ message: "Food not found" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
