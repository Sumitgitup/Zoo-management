import type { Request, Response, NextFunction } from "express";
import { MulterError } from "multer";
import { upload } from "../config/multer-config";

import logger from "../utils/logger";
import { AppError } from "../errors/AppError";
import { BadRequestError } from "../errors/BadRequest-error";

export function uploadFile(fieldName: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    upload.single(fieldName)(req, res, (err) => {
      if (err instanceof MulterError) {
        logger.error("Multer Error while uploading", err);
        return next(new BadRequestError("Error while uploading file"));
      }
      if (err) {
        logger.error("Unknown error while uploading file", err);
        return next(
          new AppError(
            "INTERNAL_SERVER_ERROR",
            500,
            "Error while uploading file"
          )
        );
      }
      // if (!req.file) {
      //   return next(new BadRequestError("No file present"));
      // }
      next();
    });
  };
}
