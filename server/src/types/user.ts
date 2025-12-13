import { Document } from 'mongoose';

/**
 * @description Interface representing a User document in MongoDB.
 */

export interface IUser extends Document {
    username: string;
    email: string;
    password?: string;
    fullname?: string | null; 
    avatarUrl?: string | null;
    createdAt: Date;
    updatedAt: Date;
}