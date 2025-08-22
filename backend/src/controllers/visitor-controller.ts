import { type Request, type Response, type NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import {
  type CreateVisitorType,
  type GetVisitorQuery,
  type UpdateVisitorType,
} from "../types/validation";
import { Visitor } from "../models/Visitor";
import logger from "../utils/logger";
import { isValidObjectId } from "mongoose";
import { BadRequestError } from "../errors/BadRequest-error";
import { NotFoundError } from "../errors/NotFound-error";
import { success } from "zod";

export class VisitorController {
  //////////////
  //methods
  async createVisitor(
    req: Request<{}, {}, CreateVisitorType>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name, age, email, nationality, phone } = req.body;

      let ageGroup = "Adult";
      if (age < 12) ageGroup = "Child";

      const newVisitor = new Visitor({
        name,
        age,
        ageGroup,
        phone,
        email,
        nationality,
        totalVisits: 0,
      });

      await newVisitor.save();

      res.status(201).json({
        success: true,
        data: newVisitor,
        message: "Visitor created successfully",
      });
    } catch (error) {
      logger.error("Error creating Visitor", error);
      throw error;
    }
  }

  async getAllVisitor(
    req: Request<{}, {}, {}, GetVisitorQuery>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const {
        name,
        nationality,
        ageGroup,
        page = "1",
        limit = "10",
        sortBy = "createdAt",
        order = "desc",
      } = req.query;

      const filter: any = {};

      if (name) {
        filter.name = { $regex: name, $options: "i" };
      }
      if (nationality) {
        filter.nationality = { $regex: nationality, $options: "i" };
      }
      if (ageGroup) {
        filter.ageGroup = { $regex: ageGroup, $options: "i" };
      }

      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);
      const skip = (pageNum - 1) * limitNum;

      const sortCofig: any = {};
      sortCofig[sortBy] = order === "asc" ? 1 : -1;

      const [visitors, totalCount] = await Promise.all([
        Visitor.find(filter).sort(sortCofig).skip(skip).limit(limitNum).lean(),
        Visitor.countDocuments(filter),
      ]);

      const result = {
        visitors,
        pagination: {
          currentPage: pageNum,
          totalPages: Math.ceil(totalCount / limitNum),
          totalCount,
          hasNext: pageNum * limitNum < totalCount,
          hasPrev: pageNum > 1,
        },
      };

      res.status(StatusCodes.CREATED).json({
        success: true,
        data: result,
      });
    } catch (error) {
      logger.error("Error getting all visitors ", error);
      throw error;
    }
  }

  async getVisitorById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return new BadRequestError("Invalid visitor ID format");
      }

      const visitor = await Visitor.findById(id);

      if (!visitor) {
        return new NotFoundError("Visitor not found");
      }

      res.status(StatusCodes.OK).json({
        success: true,
        data: visitor,
      });
    } catch (error) {
      logger.error("Error while geting visitor");
      throw error;
    }
  }

  async updateVisitor(
    req: Request<{ id: string }, {}, UpdateVisitorType>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return res.status(400).json({
          success: false,
          error: "Invalid visitor ID format",
        });
      }

      const updatedVisitor = await Visitor.findByIdAndUpdate(
        id,
        {
          ...req.body,
          updatedAt: new Date(),
          ageGroup: req.body.age ? (req.body.age < 12 ? "Child" : "Adult") : "",
        },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!updatedVisitor) {
        return new NotFoundError("Visitor not found");
      }

      res
        .status(StatusCodes.CREATED)
        .json({ success: true, data: updatedVisitor });
    } catch (error) {
      logger.error("Error while updating Visitor");
      throw error;
    }
  }

  async deleteVisitor(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid visitor ID format",
      });
    }

    const deletedVisitor = await Visitor.findByIdAndDelete(id);

    if (!deletedVisitor) {
      return new NotFoundError("Visitor not found");
    }

    res
      .status(StatusCodes.OK)
      .json({ success: true, message: "Visitor Deleted" });
  }

  // async searchVisitor(req: Request, res: Response, next: NextFunction) {
  //   try {
  //   } catch (error) {}
  // }
}
