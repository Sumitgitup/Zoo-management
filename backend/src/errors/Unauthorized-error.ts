import { AppError } from "./AppError";
import { StatusCodes } from "http-status-codes";

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super("UNAUTHORIZED_ERROR", StatusCodes.UNAUTHORIZED, message);
  }
}
