
import mongoose from "mongoose";

const connectDB = async () => {
    const mongoUri = process.env.DB_URL;

    if (!mongoUri) {
        console.error('DB_URL is not defined in .env file');
        return;
    }

    try {
        await mongoose.connect(mongoUri);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error', error)
    }
}

export default connectDB;