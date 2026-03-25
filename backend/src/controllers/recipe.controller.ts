import { NextFunction, Request, Response } from 'express';
import { Recipe } from '../models/recipe.model';
import { Exception } from '../config/exeption';
import { HTTP_STATUS } from '../config/constants';
import { asyncErrorHandler } from '../middleware/error-handler.middleware';
import { HttpResponse } from '../config/http-response';

export const getAllRecipes = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const recipes = await Recipe.find().populate('items.food');
      res.status(HTTP_STATUS.OK).json(
        new HttpResponse({ data: recipes, success: true, message: 'Recipes retrieved successfully' })
      );
    } catch (error: any) {
      return next(new Exception('An error occurred getting all recipes.', HTTP_STATUS.INTERNAL_SERVER_ERROR, error));
    }
  }
);

export const getRecipeById = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const recipe = await Recipe.findById(req.params.id).populate('items.food');
      if (!recipe) {
        return next(new Exception('Recipe not found.', HTTP_STATUS.NOT_FOUND, {}));
      }
      res.status(HTTP_STATUS.OK).json(
        new HttpResponse({ data: recipe, success: true, message: 'Recipe retrieved successfully' })
      );
    } catch (error: any) {
      return next(new Exception('An error occurred getting the recipe.', HTTP_STATUS.INTERNAL_SERVER_ERROR, error));
    }
  }
);

export const createRecipe = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const recipe = new Recipe(req.body);
      await recipe.save();
      res.status(HTTP_STATUS.CREATED).json(
        new HttpResponse({ data: recipe, success: true, message: 'Recipe created successfully' })
      );
    } catch (error: any) {
      return next(new Exception('An error occurred creating the recipe.', HTTP_STATUS.INTERNAL_SERVER_ERROR, error));
    }
  }
);

export const updateRecipe = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!recipe) {
        return next(new Exception('Recipe not found.', HTTP_STATUS.NOT_FOUND, {}));
      }
      res.status(HTTP_STATUS.OK).json(
        new HttpResponse({ data: recipe, success: true, message: 'Recipe updated successfully' })
      );
    } catch (error: any) {
      return next(new Exception('An error occurred updating the recipe.', HTTP_STATUS.INTERNAL_SERVER_ERROR, error));
    }
  }
);

export const deleteRecipe = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const recipe = await Recipe.findByIdAndDelete(req.params.id);
      if (!recipe) {
        return next(new Exception('Recipe not found.', HTTP_STATUS.NOT_FOUND, {}));
      }
      res.status(HTTP_STATUS.NO_CONTENT).send();
    } catch (error: any) {
      return next(new Exception('An error occurred deleting the recipe.', HTTP_STATUS.INTERNAL_SERVER_ERROR, error));
    }
  }
);
