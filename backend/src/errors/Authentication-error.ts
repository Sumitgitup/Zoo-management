import { AppError } from "./AppError";
import { StatusCodes } from "http-status-codes";

export class AuthenticationError extends AppError {
  constructor(message: string) {
    super("AUTHENTICATION_ERROR", StatusCodes.UNAUTHORIZED, message);
  }
}
