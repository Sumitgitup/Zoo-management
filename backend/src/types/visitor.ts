import { Document } from "mongoose";

export interface IVisitor extends Document {
  visitorId: string;
  name: string;
  age: number;
  email: string;
  nationality: string;
  ageGroup: string;
  phone?: string;
  registeredAt: Date;
  totalVisits: number;
}
