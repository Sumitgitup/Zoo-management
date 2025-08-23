import type { ITicket } from "../types/ticket";

import { model, Schema } from "mongoose";

const ticketSchema = new Schema<ITicket>(
  {
    visitorId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Visitor",
        required: true,
        index: true,
      },
    ],

    enclosureType: {
      type: String,
      required: true,
      enum: ["Safari", "Regular", "Premium"],
      index: true,
    },

    priceCategory: {
      type: String,
      required: true,
      enum: ["Adult", "Child"],
      index: true,
    },

    priceAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    issuedAt: {
      type: Date,
      required: true,
      default: Date.now,
      index: true,
    },

    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },

    status: {
      type: String,
      required: true,
      enum: ["Active", "Used", "Expired", "Cancelled"],
      default: "Active",
      index: true,
    },

    // Entry and exit tracking
    entryTime: {
      type: Date,
      default: null,
      index: true,
    },

    exitTime: {
      type: Date,
      default: null,
      index: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    collection: "tickets",
  }
);

ticketSchema.methods.markAsUsed = function () {
  this.status = "Used";
  if (!this.entryTime) {
    this.entryTime = new Date();
  }
  return this.save();
};

ticketSchema.methods.recordExit = function () {
  this.exitTime = new Date();
  return this.save();
};

ticketSchema.statics.findActiveTickets = function () {
  return this.find({
    status: "Active",
    expiresAt: { $gt: new Date() },
  });
};

ticketSchema.statics.findByVisitor = function (visitorId: string) {
  return this.find({ visitorId: visitorId });
};

// Export the model
const Ticket = model<ITicket>("Ticket", ticketSchema);

export default Ticket;

// Example usage:
/*
// Creating a new ticket
const newTicket = new Ticket({
  ticketId: 'TKT001',
  visitorId: ['507f1f77bcf86cd799439011'],
  enclosureType: 'Safari',
  priceCategory: 'adult',
  priceAmount: 25.00,
  expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
  qrCode: 'QR123456789'
});

await newTicket.save();

// Finding active tickets
const activeTickets = await Ticket.findActiveTickets();

// Marking ticket as used
const ticket = await Ticket.findOne({ ticketId: 'TKT001' });
await ticket.markAsUsed();
*/
