import { Socket } from 'socket.io';
import createError from 'http-errors';
import { verifyToken } from '../utils/token';
import { CustomJwtPayload } from '../types/token';
/**
 * Socket.io middleware to protect WebSocket connections
 */
export const socketProtect = (socket: Socket, next: (err?: any) => void): void => {
    console.log('Socket attempting to connect:', socket.id);
    try {
        // client sends token in auth object or in headers
        const token = socket.handshake.auth.token || socket.handshake.headers['authorization']?.toString().split(' ')[1];
        if (!token) {
            return next(createError.Unauthorized('Unauthorized: No token provided'));
        }

        const decoded = verifyToken(token) as CustomJwtPayload;
        if (!decoded) {
            return next(createError.Unauthorized('Unauthorized: Invalid or expired token'));
        }

        socket.data.user = decoded;

        next();

    } catch (error) {
        console.error('Socket authentication error:', error);
        next(error);
    }
}