import { type Request, type Response, type NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export class VisitorController {
  async createVisitor(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(StatusCodes.NOT_IMPLEMENTED).send("NOT Implemented");
    } catch (error) {}
  }

  async getAllVisitor(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(StatusCodes.NOT_IMPLEMENTED).send("NOT Implemented");
    } catch (error) {}
  }
  async getVisitorById(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(StatusCodes.NOT_IMPLEMENTED).send("NOT Implemented");
    } catch (error) {}
  }

  async updateVisitor(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(StatusCodes.NOT_IMPLEMENTED).send("NOT Implemented");
    } catch (error) {}
  }
  async searchVisitor(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(StatusCodes.NOT_IMPLEMENTED).send("NOT Implemented");
    } catch (error) {}
  }
}
