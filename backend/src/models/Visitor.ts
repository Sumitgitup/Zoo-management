import { Schema, model } from "mongoose";
import type { IVisitor } from "../types/visitor";

const visitorSchema = new Schema<IVisitor>(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      trim: true,
    },
    age: {
      type: String,
      required: true,
      min: 0,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    ageGroup: {
      type: String,
      enum: ["Adult", "Child"],
      default: "Adult",
      required: true,
    },
    nationality: {
      type: String,
      enum: ["Indian", "Foreigner"],
      default: "National",
      required: true,
    },
    phone: {
      type: String,
      match: [/^\d{10}$/, "Please enter a valid phone number."],
    },
    registeredAt: {
      type: Date,
      required: true,
      default: new Date(),
    },
    totalVisits: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

visitorSchema.methods.recordVisit = function () {
  this.totalVisits += 1;
  return this.save();
};

export const Visitor = model<IVisitor>("Visitor", visitorSchema);
