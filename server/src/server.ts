import { createServer } from 'http';
import { connectDB } from './config/db';
import router from './routes/index';
import express, { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { errorHandler } from './middleware/errorHandler';
import { config } from './config/env';
import { Server } from 'socket.io';
import { chatHandler } from './socket/chatHandler';
import { socketProtect } from './middleware/socket';

const PORT = config.port;

connectDB();

const app = express();
// app.listen() - REST APIs (non-real-time) -> use httpServer

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('Welcome to the Chat App!');
});
app.use('/api', router);


// ERROR HANDLING MIDDLEWARES
app.use((req: Request, res: Response, next: NextFunction) => {
    next(createError.NotFound(`Routes don't exist: ${req.method} ${req.originalUrl}`));
});
app.use(errorHandler);


const httpServer = createServer(app);

const io = new Server(httpServer, { cors: { origin: '*' } });
io.use(socketProtect);
chatHandler(io);

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});