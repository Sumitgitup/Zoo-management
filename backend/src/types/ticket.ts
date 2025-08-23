import z, { type TypeOf } from "zod";
import { Types } from "mongoose";

export const ObjectIdSchema = z
  .string()
  .refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
  });

export const TicketSchema = z.object({
  visitorId: z
    .array(ObjectIdSchema)
    .min(1, "At least one visitor ID is required")
    .max(10, "Maximum 10 visitors per ticket"),
  enclosureType: z.enum(["Safari", "Bird Sanctuary", "Reptile House"]),
  priceCategory: z.enum(["Adult", "Child"]),
  priceAmount: z.number(),
  entryTime: z.date().optional().nullable(),
  exitTime: z.date().optional().nullable(),
  issuedAt: z.date().optional(),
  expiresAt: z.date().optional(),
  status: z.string().optional(),
});

export type TicketType = z.infer<typeof TicketSchema>;

export interface ITicket extends TicketType, Document {}

export const UpdateTicketSchema = TicketSchema.partial();

export type UpdateTicketType = z.infer<typeof UpdateTicketSchema>;

export interface TicketQuerySchema {
  enclosureType?: string;
  status?: string;
  page?: string;
  limit?: string;
  order?: "asc" | "desc";
  sortBy?: string;
}
