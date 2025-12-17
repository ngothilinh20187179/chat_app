import { Request, Response } from 'express';
import createError from 'http-errors';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.model';
import { IUser } from '../types/user';
import { sendSuccessResponse } from '../utils/responseHandler';
import { CustomJwtPayload } from '../types/token';
import { generateToken } from '../utils/token';
import { RegisterRequestBody, LoginRequestBody } from '../types/user';

/**
 * @desc    Register new users
 * @route   POST /api/auth/signup
 * @access  Public
 */
export const registerUser = async (
    req: Request<{}, {}, RegisterRequestBody>, 
    res: Response
) : Promise<void> => {
    const { username, email, password, fullname } = req.body;

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

    const userObject = newUser.toObject(); // Convert Mongoose document (IUser) to plain object

    delete userObject.password;

    const tokenPayload: CustomJwtPayload = {
        userId: userObject._id.toString(), 
        username: userObject.username,
        email: userObject.email,
    };

    const token = generateToken(tokenPayload);

    // cookie storage example (same logic applies for login) (optional)

    sendSuccessResponse(
        res,
        201,
        'User registered successfully',
        { user: userObject, token }
    );
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginUser = async (
    req: Request<{}, {}, LoginRequestBody>, 
    res: Response
) : Promise<void> => {
    const { usernameOrEmail, password } = req.body;

    const user = await User.findOne({
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
    }).select('+password');

    if (!user) {
        throw createError.Unauthorized('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw createError.Unauthorized('Invalid credentials');
    }

    const userObject = user.toObject();
    const { password: _, ...userWithoutPassword } = userObject;

    const tokenPayload: CustomJwtPayload = {
        userId: userObject._id.toString(),
        username: userObject.username,
        email: userObject.email,
    };

    const token = generateToken(tokenPayload);

    // If using cookies for token storage
    // res.cookie('token', token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === 'production',
    //     sameSite: 'strict',
    //     path: '/api/auth'
    // });

    sendSuccessResponse(
        res,
        200,
        'User logged in successfully',
        { user: userWithoutPassword, token } // Client store token in localStorage/sessionStorage
    );
};

/**
 * @desc    Logout user
 * @route   POST /api/auth/logout
 * @access  Public
 */
export const logoutUser = (req: Request, res: Response): void => {
    // If using cookies for token storage
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/api/auth'
    });

    sendSuccessResponse(
        res,
        200,
        'User logged out successfully',
        null
    );
};