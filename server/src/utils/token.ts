import { config } from "../config/env";
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import { CustomJwtPayload } from "../types/token";

const jwt = require('jsonwebtoken');
const jwtSecret = config.jwtSecret;
const tokenExpiration: string = config.tokenExpiration;

/**
* @description Generate a JWT from user data.
* @param {object} payload - The data you want to embed in the token (e.g., userId, role).
* @returns {string} – The JWT string has been created.
*/

export const generateToken = (payload: CustomJwtPayload): string => {
    try {
        const token = jwt.sign(
            payload,
            jwtSecret,
            { expiresIn: tokenExpiration }
        );
        return token;
    } catch (error) {
        throw new Error('Error generating token');
    }
}

/**
 * @description JWT verification function.
 * @param {string} token - The JWT string to be verified.
 * @returns {object|null} - The decoded token payload if valid, otherwise null.
 */

export const verifyToken = (token: string): CustomJwtPayload | null => {
    try {
        const decoded = jwt.verify(token, jwtSecret) as CustomJwtPayload;
        return decoded;
    } catch (error) {
        // if (error instanceof TokenExpiredError) return null;
        // if (error instanceof JsonWebTokenError) return null;
        // throw error;
        return null;
    }
}