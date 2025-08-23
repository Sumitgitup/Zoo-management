import type { Request, Response } from "express";
import Staff from "../models/staff.model";

// @desc    Create new staff
export const createStaff = async (req: Request, res: Response) => {
  try {
    const { body } = res.locals.validatedData;
    const newStaff = new Staff(body);
    const savedStaff = await newStaff.save();
    res.status(201).json(savedStaff);
  } catch (error) {
    console.error("Error creating staff:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({
      message: "Server error while creating staff.",
      error: errorMessage,
    });
  }
};

// @desc  Get all staff with filtering and pagination
export const getStaff = async (req: Request, res: Response) => {
  try {
    // Get validated query parameters
    const { query } = res.locals.validatedData;
    const { page = 1, limit = 10, role, department } = query;

    // Build the filter object
    const filter: any = {};
    if (role) {
      filter.role = role;
    }
    if (department) {
      filter.department = department;
    }

    const skip = (page - 1) * limit;

    const [staff, total] = await Promise.all([
      Staff.find(filter).skip(skip).limit(limit),
      Staff.countDocuments(filter),
    ]);

    res.status(200).json({
      data: staff,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching staff', error });
  }
};


// --- GET BY ID FIX ---
// @desc    Get a single staff member by employeeId
export const getStaffById = async (req: Request, res: Response) => {
  try {
    // Use findOne to search by the employeeId field
    const staffMember = await Staff.findOne({ employeeId: req.params.id });
    if (!staffMember) {
      return res.status(404).json({ message: "Staff member not found" });
    }
    res.status(200).json(staffMember);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error while fetching staff member", error });
  }
};

// --- UPDATE FIX ---
// @desc    Update a staff member by employeeId
export const updateStaff = async (req: Request, res: Response) => {
  try {
    const { params, body } = res.locals.validatedData;
    const { id: employeeId } = params;

    // Use findOneAndUpdate to search by the employeeId field
    const updatedStaff = await Staff.findOneAndUpdate(
      { employeeId: employeeId }, // The search query
      body, // The update data
      { new: true } // Options: return the updated document
    );

    if (!updatedStaff) {
      return res.status(404).json({ message: "Staff member not found" });
    }
    res.status(200).json(updatedStaff);
  } catch (error) {
    console.error("Error updating staff:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({
      message: "Server error while updating staff.",
      error: errorMessage,
    });
  }
};

// --- DELETE FIX ---
// @desc    Delete a staff member by employeeId
export const deleteStaff = async (req: Request, res: Response) => {
  try {
    // Use findOneAndDelete to search by the employeeId field
    const deletedStaff = await Staff.findOneAndDelete({
      employeeId: req.params.id,
    });
    if (!deletedStaff) {
      return res.status(404).json({ message: "Staff member not found" });
    }
    res.status(200).json({ message: "Staff member deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error while deleting staff", error });
  }
};
