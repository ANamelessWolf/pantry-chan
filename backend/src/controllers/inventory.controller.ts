import { NextFunction, Request, Response } from 'express';
import { Inventory } from '../models/inventory.model';
import { Exception } from '../config/exeption';
import { HTTP_STATUS } from '../config/constants';
import { asyncErrorHandler } from '../middleware/error-handler.middleware';
import { HttpResponse } from '../config/http-response';

export const getAllInventory = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const items = await Inventory.find().populate('food');
      res.status(HTTP_STATUS.OK).json(
        new HttpResponse({ data: items, success: true, message: 'Inventory retrieved successfully' })
      );
    } catch (error: any) {
      return next(new Exception('An error occurred getting inventory.', HTTP_STATUS.INTERNAL_SERVER_ERROR, error));
    }
  }
);

export const getInventoryById = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = await Inventory.findById(req.params.id).populate('food');
      if (!item) {
        return next(new Exception('Inventory item not found.', HTTP_STATUS.NOT_FOUND, {}));
      }
      res.status(HTTP_STATUS.OK).json(
        new HttpResponse({ data: item, success: true, message: 'Inventory item retrieved successfully' })
      );
    } catch (error: any) {
      return next(new Exception('An error occurred getting the inventory item.', HTTP_STATUS.INTERNAL_SERVER_ERROR, error));
    }
  }
);

export const createInventoryItem = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = new Inventory(req.body);
      await item.save();
      res.status(HTTP_STATUS.CREATED).json(
        new HttpResponse({ data: item, success: true, message: 'Inventory item created successfully' })
      );
    } catch (error: any) {
      return next(new Exception('An error occurred creating the inventory item.', HTTP_STATUS.INTERNAL_SERVER_ERROR, error));
    }
  }
);

export const updateInventoryItem = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!item) {
        return next(new Exception('Inventory item not found.', HTTP_STATUS.NOT_FOUND, {}));
      }
      res.status(HTTP_STATUS.OK).json(
        new HttpResponse({ data: item, success: true, message: 'Inventory item updated successfully' })
      );
    } catch (error: any) {
      return next(new Exception('An error occurred updating the inventory item.', HTTP_STATUS.INTERNAL_SERVER_ERROR, error));
    }
  }
);

export const deleteInventoryItem = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = await Inventory.findByIdAndDelete(req.params.id);
      if (!item) {
        return next(new Exception('Inventory item not found.', HTTP_STATUS.NOT_FOUND, {}));
      }
      res.status(HTTP_STATUS.NO_CONTENT).send();
    } catch (error: any) {
      return next(new Exception('An error occurred deleting the inventory item.', HTTP_STATUS.INTERNAL_SERVER_ERROR, error));
    }
  }
);
