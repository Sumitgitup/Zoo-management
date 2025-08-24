import mongoose from "mongoose";
import serverConfig from "./server-config";
import { seedAdminUser } from "../utils/seedAdmin";

const connectDB = async () => {
  try {
    await mongoose.connect(serverConfig.DB_URL!);
    console.log("MongoDB connected successfully");
    // await seedAdminUser();
  } catch (error) {
    console.error("MongoDB connection error", error);
  }
};

export default connectDB;
