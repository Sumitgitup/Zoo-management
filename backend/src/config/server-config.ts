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
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
};
