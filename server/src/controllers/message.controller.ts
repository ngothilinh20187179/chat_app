import { Request, Response } from 'express';
import { Message } from '../models/message.model';
import { sendSuccessResponse } from '../utils/responseHandler';

export const getChatHistory = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.userId;
    const { recipientId } = req.params;

    const query: any = {
        $or: [
            { sender: userId, recipient: recipientId },
            { sender: recipientId, recipient: userId }
        ]
    };

    const messages = await Message.find(query).sort({ createdAt: 1 });

    sendSuccessResponse(res, 200, 'Chat history retrieved successfully', { messages });
};