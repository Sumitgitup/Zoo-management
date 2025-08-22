import { AppError } from "./AppError";
import { StatusCodes } from "http-status-codes";

export class BadRequestError extends AppError {
  constructor(message: string) {
    super("BAD_REQUEST", StatusCodes.BAD_REQUEST, message);
  }
}
