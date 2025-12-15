import mongoose from "mongoose";
import { config } from "./env";
const mongo_uri = config.mongoURI;

export const connectDB = async () => {
    try {
      const conn = await mongoose.connect(mongo_uri as string);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(`Error connecting to MongoDB:`, error);
    }
};