import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import logger from "../utils/logger";
import { StatusCodes } from "http-status-codes";

export const errorHandler = function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    logger.error(`${err.type} ${err.message}`);
    res.status(err.statusCode).json({
      success: false,
      type: err.type,
      message: err.message,
    });
  }

  logger.error("UNHANDLED ERROR:", err);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: "error",
    type: "INTERNAL_SERVER_ERROR",
    message: "Something went wrong",
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
  });
};
