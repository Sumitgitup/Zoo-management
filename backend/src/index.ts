import express, { type Express, type Request, type Response } from "express";
import morgan from "morgan";
import cors from "cors";

import connectDB from "./config/db-config";
import apiRoutes from "./routes";
import ServerConfig from "./config/server-config";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
  origin: "http://localhost:5173",  // your frontend URL
  credentials: true,                // allow cookies/auth headers
}));

app.get("/api/v1/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "API is running!" });
});

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  await connectDB();
});
