import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

const mongo_url = process.env.MONGO_URL;

export const db = async () => {
    try {
        await mongoose.connect(mongo_url);
        console.log("Database connected successfully");
        return true;
    } catch (error) {
        console.log("Mongoose connection error", error);
        return false;
    }
};