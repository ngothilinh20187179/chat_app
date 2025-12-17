import createError from 'http-errors';
import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

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