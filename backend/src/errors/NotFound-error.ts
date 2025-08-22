import { AppError } from "./AppError";
import { StatusCodes } from "http-status-codes";

export class NotFoundError extends AppError {
  resource: string;
  constructor(resource: string) {
    super("NOT_FOUND", StatusCodes.NOT_FOUND, `${resource} is not found`);
    this.resource = resource;
  }
}
