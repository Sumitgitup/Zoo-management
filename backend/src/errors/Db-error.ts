import { AppError } from "./AppError";
import { StatusCodes } from "http-status-codes";

export class DBError extends AppError {
  constructor(message: string) {
    super("DB_ERROR", StatusCodes.INTERNAL_SERVER_ERROR, message);
  }
}
