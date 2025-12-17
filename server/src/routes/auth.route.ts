import express, { Router } from 'express';
import { registerUser, loginUser, logoutUser } from "../controllers/auth.controller";
import { validateRequest } from '../middleware/validator';
import { registerSchema, loginSchema } from '../validations/auth.validation';

const authRoutes: Router = express.Router();

authRoutes.post("/signup", validateRequest(registerSchema), registerUser);
authRoutes.post("/login", validateRequest(loginSchema), loginUser);
authRoutes.post("/logout", logoutUser);

export default authRoutes;