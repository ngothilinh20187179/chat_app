import { Document } from 'mongoose';

/**
 * @description Interface representing a User document in MongoDB.
 */

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    fullname?: string | null; 
    avatarUrl?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface RegisterRequestBody extends Pick<IUser, 'username' | 'email' | 'password' | 'fullname'> {}

export interface LoginRequestBody {
    usernameOrEmail: string;
    password: string;
}