import { getChatHistory } from '../controllers/message.controller';

import express, { Router } from 'express';

const messRoutes: Router = express.Router();

messRoutes.get("/chat/:recipientId", getChatHistory);   

export default messRoutes;