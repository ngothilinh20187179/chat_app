import createError from 'http-errors';
import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { verifyToken } from '../utils/token';
import { CustomJwtPayload } from '../types/token';

/**
 * Middleware to validate request body using Joi schema
 * @param schema Joi schema to validate against
 */
export const validateRequest = (schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const validationErrors = error.details.map((detail) => detail.message).join(', ');
            return next(createError.BadRequest(`Validation error: ${validationErrors}`));
        }
        next();
    };
}

export const protectRoute = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw createError.Unauthorized('Unauthorized: No token provided');
        }

        // Split the "Bearer" part and get the token
        const token = authHeader.split(' ')[1];
        if (!token) {
            throw createError.Unauthorized('Unauthorized: Token format is invalid');
        }

        const decoded = verifyToken(token) as CustomJwtPayload;
        if (!decoded) {
            throw createError.Unauthorized('Unauthorized: Invalid or expired token');
        }

        req.user = decoded;

    } catch (error) {
        next(createError.InternalServerError('Authentication error'));
    }
}