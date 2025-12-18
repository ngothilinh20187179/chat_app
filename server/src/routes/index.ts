import express, { Router } from 'express';
import authRoutes from './auth.route'; 
import { protectRoute } from '../middleware/validator';
import messRoutes from './mess.route';

const router: Router = express.Router();

router.use('/auth', authRoutes); 
router.use('/messages', protectRoute, messRoutes);

export default router;