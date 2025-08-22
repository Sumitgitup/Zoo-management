import "dotenv/config";
import { configDotenv } from "dotenv";

configDotenv();

export default {
  PORT: process.env.PORT || 4000,
  DB_URL: process.env.DB_URL,
  BUN_ENV: process.env.BUN_ENV,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};
