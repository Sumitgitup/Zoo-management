import { configDotenv } from "dotenv";

configDotenv();

export default {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  BUN_ENV: process.env.BUN_ENV,
};
