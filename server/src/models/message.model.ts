import mongoose from "mongoose";
import { IMessageDocument } from "../types/message";

const messageSchema = new mongoose.Schema<IMessageDocument>({
    sender: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    recipient: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    read: { 
        type: Boolean, 
        default: false 
    }
}, { timestamps: true });

export const Message = mongoose.model<IMessageDocument>("Message", messageSchema);