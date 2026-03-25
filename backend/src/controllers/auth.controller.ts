import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user.model';
import { generateToken } from '../utils/jwt';
import { Exception } from '../config/exeption';
import { HTTP_STATUS } from '../config/constants';
import { asyncErrorHandler } from '../middleware/error-handler.middleware';
import { HttpResponse } from '../config/http-response';

export const register = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new Exception('Email and password are required.', HTTP_STATUS.BAD_REQUEST, {}));
      }

      const existing = await User.findOne({ email });
      if (existing) {
        return next(new Exception('Email already in use.', HTTP_STATUS.BAD_REQUEST, {}));
      }

      const hashed = await bcrypt.hash(password, 10);
      const user = await User.create({ email, password: hashed });
      const token = generateToken(user.id);

      res.status(HTTP_STATUS.CREATED).json(
        new HttpResponse({ data: { token }, success: true, message: 'User registered successfully' })
      );
    } catch (error: any) {
      return next(new Exception('An error occurred during registration.', HTTP_STATUS.INTERNAL_SERVER_ERROR, error));
    }
  }
);

export const login = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new Exception('Email and password are required.', HTTP_STATUS.BAD_REQUEST, {}));
      }

      const user = await User.findOne({ email });
      if (!user) {
        return next(new Exception('Invalid credentials.', HTTP_STATUS.UNAUTHORIZED, {}));
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return next(new Exception('Invalid credentials.', HTTP_STATUS.UNAUTHORIZED, {}));
      }

      const token = generateToken(user.id);
      res.status(HTTP_STATUS.OK).json(
        new HttpResponse({ data: { token }, success: true, message: 'Login successful' })
      );
    } catch (error: any) {
      return next(new Exception('An error occurred during login.', HTTP_STATUS.INTERNAL_SERVER_ERROR, error));
    }
  }
);
