import { Request, Response, NextFunction } from 'express';
import AppError from '../errors/AppError';

export default class ErrorHandleMiddleware {
  public static handdleError(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        type: 'error',
        message: error.message,
      });
    }

    console.error(error);

    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });

  }
}
