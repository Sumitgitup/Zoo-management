import { Document } from "mongoose";

export interface IVisitor extends Document {
  name: string;
  age: number;
  email: string;
  nationality: string;
  ageGroup: string;
  phone?: string;
  registeredAt: Date;
  totalVisits: number;
}
