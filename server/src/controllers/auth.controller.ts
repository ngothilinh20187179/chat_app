import { Request, Response } from 'express';
import createError from 'http-errors';
import bcrypt from 'bcryptjs';
import { User } from '../models';
import { IUser } from '../types';
import { sendSuccessResponse } from '../middleware/responseHandler';

/**
 * @desc    Register new users
 * @route   POST /api/auth/signup
 * @access  Public
 */
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password, fullname } = req.body;
    if (!username || !email || !password) {
        throw createError.BadRequest('Please provide your username, email, and password.');
    }
    if (password.length < 6) {
        throw createError.BadRequest('Passwords must be at least 6 characters.');
    }
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        throw createError.Conflict('Username or email is already taken.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: IUser = new User({
        username,
        email,
        password: hashedPassword,
        fullname
    });
    await newUser.save();

    const newUserWithoutPassword = newUser.toObject();
    delete newUserWithoutPassword.password;

    sendSuccessResponse(
        res,
        201,
        'User registered successfully',
        { user: newUserWithoutPassword }
    );
};

export const loginUser = (req: Request, res: Response) => {
    res.send('User logged in successfully');
};

export const logoutUser = (req: Request, res: Response) => {
    res.send('User logged out successfully');
}