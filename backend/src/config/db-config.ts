import mongoose from "mongoose";
import serverConfig from "./server-config";

const connectDB = async () => {
  try {
    await mongoose.connect(serverConfig.DB_URL!);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error", error);
  }
};

export default connectDB;
