import type { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodSchema } from "zod/v3";

const validateInput =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Input validation failed",
        error: result.error.issues[0]?.message,
      });
    }
    req.body = result.data;
    next();
  };

export default validateInput;
