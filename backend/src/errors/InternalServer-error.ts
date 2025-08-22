import { AppError } from "./AppError";
import { StatusCodes } from "http-status-codes";

export class InternalSeverError extends AppError {
  constructor() {
    super(
      "INTERNAL_SERVER_ERROR",
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something happened on our side"
    );
  }
}
