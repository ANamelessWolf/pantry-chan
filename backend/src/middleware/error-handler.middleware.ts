import { NextFunction, Request, Response } from "express";
import { Exception } from "../config/exeption";
import { HttpErrorResponse, HttpResponse } from "../config/http-response";
import dotenv from "dotenv";
dotenv.config();

/**
 * Express middleware function to handle errors.
 * @param err The error object.
 * @param req The Express request object.
 * @param res The Express response object.
 * @param next The next middleware function in the stack.
 */
export const errorHandler = (
  err: Exception,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Determine the HTTP status code for the response.
  const errorStatus = err.statusCode || req.statusCode || 500;

  // Determine the error message based on the status code.
  let errorMessage = "Something went wrong";
  if (err?.message) {
    errorMessage = err.message;
  }

  // Send the error response to the client.
  if (process.env.DEBUG === "true") {
    const stack = err.stack?.split("\n").map((line) => line.trim());
    res.status(errorStatus).json(
      new HttpErrorResponse({
        success: false,
        data: stack,
        errorCode: errorStatus,
        message: errorMessage,
        error: err.detail,
      })
    );
  } else {
    res.status(errorStatus).json(
      new HttpErrorResponse({
        data: [],
        success: false,
        errorCode: errorStatus,
        message: errorMessage,
      })
    );
  }
  next();
};

/**
 * Receives an async controller function 'func' and checks if the operation
 * resolves inside, otherwise, this function resolves and sends the request
 * to the error handling middleware.
 */
export const asyncErrorHandler =
  (func: (req: Request, resp: Response, next: NextFunction) => void) =>
  (req: Request, resp: Response, next: NextFunction) =>
    Promise.resolve(func(req, resp, next)).catch(next);
