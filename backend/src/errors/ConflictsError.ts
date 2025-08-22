import { AppError } from "./AppError";

export class ConflictError extends AppError {
  constructor(message: string) {
    super("CONFLICT_ERROR", 409, message);
  }
}
