import { Server, Socket } from "socket.io";
import { Message } from "../models/message.model";

const userSocketMap: Record<string, string> = {};

export const chatHandler = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        console.log(`User connected: ${socket.id}`);

        const userId = socket.data.user.userId;
        userSocketMap[userId] = socket.id;

        socket.on("sendMessage", async (data: { recipientId: string, content: string }) => {
            const { recipientId, content } = data;

            // Save message to database
            const newMessage = await Message.create({
                sender: userId,
                recipient: recipientId,
                content
            });
            
            // Emit message to recipient if online
            const recipientSocketId = userSocketMap[recipientId];
            if (recipientSocketId) {
                io.to(recipientSocketId).emit("receiveMessage", newMessage);
            }

            // Optionally, emit an acknowledgment back to the sender
            socket.emit("messageSent", newMessage);

        });

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
            delete userSocketMap[userId];
        });
        
    });
}