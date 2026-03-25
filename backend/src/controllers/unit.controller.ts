import { NextFunction, Request, Response } from 'express';
import { Unit } from '../models/unit.model';
import { Exception } from '../config/exeption';
import { HTTP_STATUS } from '../config/constants';
import { asyncErrorHandler } from '../middleware/error-handler.middleware';
import { HttpResponse } from '../config/http-response';

export const getAllUnits = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const units = await Unit.find();
      res.status(HTTP_STATUS.OK).json(
        new HttpResponse({ data: units, success: true, message: 'Units retrieved successfully' })
      );
    } catch (error: any) {
      return next(new Exception('An error occurred getting all units.', HTTP_STATUS.INTERNAL_SERVER_ERROR, error));
    }
  }
);

export const getUnitById = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const unit = await Unit.findById(req.params.id);
      if (!unit) {
        return next(new Exception('Unit not found.', HTTP_STATUS.NOT_FOUND, {}));
      }
      res.status(HTTP_STATUS.OK).json(
        new HttpResponse({ data: unit, success: true, message: 'Unit retrieved successfully' })
      );
    } catch (error: any) {
      return next(new Exception('An error occurred getting the unit.', HTTP_STATUS.INTERNAL_SERVER_ERROR, error));
    }
  }
);

export const createUnit = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const unit = new Unit(req.body);
      await unit.save();
      res.status(HTTP_STATUS.CREATED).json(
        new HttpResponse({ data: unit, success: true, message: 'Unit created successfully' })
      );
    } catch (error: any) {
      return next(new Exception('An error occurred creating the unit.', HTTP_STATUS.INTERNAL_SERVER_ERROR, error));
    }
  }
);

export const updateUnit = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const unit = await Unit.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!unit) {
        return next(new Exception('Unit not found.', HTTP_STATUS.NOT_FOUND, {}));
      }
      res.status(HTTP_STATUS.OK).json(
        new HttpResponse({ data: unit, success: true, message: 'Unit updated successfully' })
      );
    } catch (error: any) {
      return next(new Exception('An error occurred updating the unit.', HTTP_STATUS.INTERNAL_SERVER_ERROR, error));
    }
  }
);

export const deleteUnit = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const unit = await Unit.findByIdAndDelete(req.params.id);
      if (!unit) {
        return next(new Exception('Unit not found.', HTTP_STATUS.NOT_FOUND, {}));
      }
      res.status(HTTP_STATUS.NO_CONTENT).send();
    } catch (error: any) {
      return next(new Exception('An error occurred deleting the unit.', HTTP_STATUS.INTERNAL_SERVER_ERROR, error));
    }
  }
);
