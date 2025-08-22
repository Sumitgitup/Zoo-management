

import { Schema, model } from 'mongoose';
import type { IStaff } from '../types/staff';

// The Schema corresponding to the IStaff interface
const staffSchema = new Schema<IStaff>({
  employeeId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Veterinarian', 'Caretaker', 'Volunteer'], required: true },
  department: { type: String, enum: ['Medical', 'Operations', 'Adoption'], required: true },
  isActive: { type: Boolean, default: true },
  hireDate: { type: Date, required: true },
  permissions: { type: [String] },
  shift: {
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    workDays: { type: [String], required: true },
  },
  emergencyContact: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    relationship: { type: String, required: true },
  },
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create and export the Model
const Staff = model<IStaff>('Staff', staffSchema);

export default Staff;