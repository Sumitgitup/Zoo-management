
import { z } from 'zod';
import { Document } from 'mongoose';

// Base Zod schema for the Staff object's properties
const staffBaseSchema = z.object({
  employeeId: z.string().min(1, { message: 'Employee ID is required' }),
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.email({ message: 'Invalid email address' }),
  phone: z.string().min(1, { message: 'Phone number is required' }),
  role: z.enum(['Admin', 'Veterinarian', 'Caretaker', 'Volunteer']),
  department: z.enum(['Medical', 'Operations', 'Adoption']),
  isActive: z.boolean().default(true),
  hireDate: z.string().transform((str) => new Date(str)), // Accepts a date string
  permissions: z.array(z.string()).optional(),
  shift: z.object({
    startTime: z.string(),
    endTime: z.string(),
    workDays: z.array(z.string()),
  }),
  emergencyContact: z.object({
    name: z.string().min(1, { message: 'Emergency contact name is required' }),
    phone: z.string().min(1, { message: 'Emergency contact phone is required' }),
    relationship: z.string().min(1, { message: 'Relationship is required' }),
  }),
});

// Infer the TypeScript type for the base staff object
type IStaffBase = z.infer<typeof staffBaseSchema>;

// Create the final interface for the Mongoose model
export interface IStaff extends IStaffBase, Document {}

// Schema for validating the creation of new staff
export const createStaffSchema = z.object({
  body: staffBaseSchema,
});

// Schema for validating updates to existing staff
export const updateStaffSchema = z.object({
  body: staffBaseSchema.partial(), // .partial() makes all fields optional
  params: z.object({
    id: z.string().min(1, { message: 'A valid staff ID is required' }),
  }),
});