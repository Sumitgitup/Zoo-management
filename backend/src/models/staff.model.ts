import { Schema, model } from "mongoose";
import type { IStaff } from "../types/staff";
import bcrypt from "bcrypt";

// The Schema corresponding to the IStaff interface, with all fields made optional
const staffSchema = new Schema<IStaff>(
  {
    // employeeId is still unique, but not required to be provided for every operation.
    employeeId: { type: String, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    // email is still unique, but not required.
    email: { type: String, unique: true },
    password: {
      type: String,
      select: false, // Don't include password in queries by default
    },
    phone: { type: String },
    role: {
      type: String,
      enum: ["Admin", "Veterinarian", "Caretaker", "Volunteer", "Receptionist"],
    },
    department: {
      type: String,
      enum: [
        "Medical",
        "Operations",
        "Adoption",
        "Administration",
        "Maintenance",
      ],
    },
    isActive: { type: Boolean, default: true },
    hireDate: { type: Date },
    permissions: [{ type: [String] }],
    shift: {
      startTime: { type: String },
      endTime: { type: String },
      workDays: { type: [String] },
    },
    emergencyContact: {
      name: { type: String },
      phone: { type: String },
      relationship: { type: String },
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
    // Mongoose pre-hooks expect the error to be passed to next()
    if (error instanceof Error) {
        next(error);
    }
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
