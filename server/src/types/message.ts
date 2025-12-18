import mongoose from "mongoose";

export interface IMessage {
    sender: mongoose.Types.ObjectId | string;
    recipient: mongoose.Types.ObjectId | string;
    content: string;
    read: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IMessageDocument extends IMessage, mongoose.Document {}