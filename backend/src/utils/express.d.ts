import { Request } from "express";
import type { JwtPayload } from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    user?: JwtPayload;
    file?: Express.Multer.File;
  }
}
