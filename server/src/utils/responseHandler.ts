import { Response } from 'express';
import { ISuccessResponse } from '../types/response';

export const sendSuccessResponse = (
    res: Response,
    status: number,
    message: string,
    data: any = null
): void => {
    const responseBody: ISuccessResponse = {
        success: true,
        status,
        message,
        data,
        timestamp: new Date().toISOString(),
    };
    res.status(status).json(responseBody);
};