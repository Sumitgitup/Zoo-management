import { Schema, model } from "mongoose";
import type { IStaff } from "../types/staff";
import bcrypt from "bcrypt";

// The Schema corresponding to the IStaff interface
const staffSchema = new Schema<IStaff>(
  {
    employeeId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // Don't include password in queries by default
    },
    phone: { type: String, required: true },
    role: {
      type: String,
      enum: ["Admin", "Veterinarian", "Caretaker", "Volunteer", "Receptionist"],
      required: true,
    },
    department: {
      type: String,
      enum: [
        "*",
        "Medical",
        "Operations",
        "Adoption",
        "Administration",
        "Maintenance",
      ],
      required: true,
    },
    isActive: { type: Boolean, default: true },
    hireDate: { type: Date, required: true },
    permissions: [{ type: [String] }],
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
    refreshToken: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

staffSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    throw error;
  }
});

staffSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

// Create and export the Model
const Staff = model<IStaff>("Staff", staffSchema);

export default Staff;
