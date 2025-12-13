import express, { Router } from 'express';
import { registerUser, loginUser, logoutUser } from "../controllers";

const authRoutes: Router = express.Router();

authRoutes.post("/signup", registerUser);
authRoutes.post("/login", loginUser);
authRoutes.post("/logout", logoutUser);

export default authRoutes;