import { NextFunction, Request, Response } from 'express';
import { FoodCategory } from '../models/foodCategory.model';
import { Exception } from '../config/exeption';
import { HTTP_STATUS } from '../config/constants';
import { asyncErrorHandler } from '../middleware/error-handler.middleware';
import { HttpResponse } from '../config/http-response';

export const getAllCategories = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await FoodCategory.find();
      res.status(HTTP_STATUS.OK).json(
        new HttpResponse({ data: categories, success: true, message: 'Categories retrieved successfully' })
      );
    } catch (error: any) {
      return next(new Exception('An error occurred getting all categories.', HTTP_STATUS.INTERNAL_SERVER_ERROR, error));
    }
  }
);

export const getCategoryById = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await FoodCategory.findById(req.params.id);
      if (!category) {
        return next(new Exception('Category not found.', HTTP_STATUS.NOT_FOUND, {}));
      }
      res.status(HTTP_STATUS.OK).json(
        new HttpResponse({ data: category, success: true, message: 'Category retrieved successfully' })
      );
    } catch (error: any) {
      return next(new Exception('An error occurred getting the category.', HTTP_STATUS.INTERNAL_SERVER_ERROR, error));
    }
  }
);

export const createCategory = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = new FoodCategory(req.body);
      await category.save();
      res.status(HTTP_STATUS.CREATED).json(
        new HttpResponse({ data: category, success: true, message: 'Category created successfully' })
      );
    } catch (error: any) {
      return next(new Exception('An error occurred creating the category.', HTTP_STATUS.INTERNAL_SERVER_ERROR, error));
    }
  }
);

export const updateCategory = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await FoodCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!category) {
        return next(new Exception('Category not found.', HTTP_STATUS.NOT_FOUND, {}));
      }
      res.status(HTTP_STATUS.OK).json(
        new HttpResponse({ data: category, success: true, message: 'Category updated successfully' })
      );
    } catch (error: any) {
      return next(new Exception('An error occurred updating the category.', HTTP_STATUS.INTERNAL_SERVER_ERROR, error));
    }
  }
);

export const deleteCategory = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await FoodCategory.findByIdAndDelete(req.params.id);
      if (!category) {
        return next(new Exception('Category not found.', HTTP_STATUS.NOT_FOUND, {}));
      }
      res.status(HTTP_STATUS.NO_CONTENT).send();
    } catch (error: any) {
      return next(new Exception('An error occurred deleting the category.', HTTP_STATUS.INTERNAL_SERVER_ERROR, error));
    }
  }
);
