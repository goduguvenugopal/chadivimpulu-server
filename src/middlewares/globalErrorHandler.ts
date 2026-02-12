import { Request, Response, NextFunction } from "express";

/**
 * Extend default Error type
 */
interface CustomError extends Error {
  statusCode?: number;
}

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Cast incoming error
  const customErr = err as CustomError;

  const statusCode = customErr.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    error: {
      name: customErr.name,
      message: customErr.message,
    },
    stack:
      process.env.NODE_ENV === "development"
        ? customErr.stack
        : undefined,
  });
};
