import { Request, Response, NextFunction } from 'express';
import { IErrorResponse } from '../types';
/**
 * @description Global Error Handler Middleware.
 */

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const statusCode: number = err.status || 500;
    const message: string = err.message || 'Internal Server Error';
    const errorName: string = err.name || 'Error';

    const errorResponse: IErrorResponse = {
        success: false,
        status: statusCode,
        message,
        error: errorName,
        timestamp: new Date().toISOString(),
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    };

    res.status(statusCode).json(errorResponse);
};