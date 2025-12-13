import mongoose from "mongoose";

/**
 * @description User Schema and Model.
 */

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true
    },
    fullname: { 
        type: String,
        required: false
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true,
        lowercase: true
    },
    password: { 
        type: String,
        minlength: 6, 
        required: true,
        select: false
    },
    avatarUrl: { 
        type: String, 
        required: false 
    }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);