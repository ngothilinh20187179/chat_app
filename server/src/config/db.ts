import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongo_uri = process.env.MONGODB_ATLAS_URI;

export const connectDB = async () => {
    try {
      const conn = await mongoose.connect(mongo_uri as string);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(`Error connecting to MongoDB:`, error);
    }
};