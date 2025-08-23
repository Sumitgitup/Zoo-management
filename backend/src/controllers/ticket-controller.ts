import { type Request, type Response, type NextFunction } from "express";
import type {
  TicketQuerySchema,
  TicketType,
  UpdateTicketType,
} from "../types/ticket";
import Ticket from "../models/ticket.model";
import logger from "../utils/logger";
import { StatusCodes } from "http-status-codes";
import { isValidObjectId } from "mongoose";
import { BadRequestError } from "../errors/BadRequest-error";
import { NotFoundError } from "../errors/NotFound-error";

export const createTicket = async (
  req: Request<{}, {}, TicketType>,
  res: Response
) => {
  const { visitorId, enclosureType, priceAmount, priceCategory } = req.body;

  try {
    const newTicket = new Ticket({
      visitorId,
      enclosureType,
      priceAmount,
      priceCategory,
      entryTime: new Date(),
      issuedAt: new Date(),
      status: "Active",
      expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000),
      exitTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    await newTicket.save();

    res
      .status(StatusCodes.CREATED)
      .json({ success: true, data: newTicket, message: "Ticket Issued" });
  } catch (error) {
    logger.error("Error while creating tickets");
    throw error;
  }
};

export const getAllTicket = async (
  req: Request<{}, {}, {}, TicketQuerySchema>,
  res: Response
) => {
  try {
    const {
      enclosureType,
      status,
      page = "1",
      limit = "10",
      sortBy = "createdAt",
      order = "asc",
    } = req.query;

    const filter: any = {};
    if (enclosureType) {
      filter.enclosureType = { $regex: enclosureType, $options: "i" };
    }
    if (status) {
      filter.status = { $regex: status, $options: "i" };
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const sortCofig: any = {};
    sortCofig[sortBy] = order === "asc" ? 1 : -1;

    const [tickets, totalCount] = await Promise.all([
      Ticket.find(filter).sort(sortCofig).skip(skip).limit(limitNum).lean(),
      Ticket.countDocuments(filter),
    ]);

    const result = {
      tickets,
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
    logger.error("Error getting all Tickets ", error);
    throw error;
  }
};

export const getTicketById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return new BadRequestError("Invalid visitor ID format");
    }

    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return new NotFoundError("Ticket not found");
    }
    res.status(StatusCodes.OK).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    logger.error("Error while getting ticket");
    throw error;
  }
};

export const updateTicket = async (
  req: Request<{ id: string }, {}, {}, UpdateTicketType>,
  res: Response
) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return new BadRequestError("Invalid visitor ID format");
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
      id,
      {
        ...req.body,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updateTicket) {
      return new NotFoundError("Ticket not found");
    }

    res.status(StatusCodes.OK).json({ success: true, data: updateTicket });
  } catch (error) {
    logger.error("Error while updating Ticket");
    throw error;
  }
};
export const deleteTicket = async (req: Request, res: Response) => {};
