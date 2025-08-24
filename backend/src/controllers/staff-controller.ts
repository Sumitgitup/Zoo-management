import type { Request, Response } from "express";
import Staff from "../models/staff.model";

// @desc    Create new staff
// @route   POST /api/v1/staffs
export const createStaff = async (req: Request, res: Response) => {
  try {
    const newStaff = new Staff(req.body);
    const savedStaff = await newStaff.save();
    res.status(201).json({
        success: true,
        data: savedStaff 
    });
  } catch (error) {
    res.status(500).json({ 
        success: false,
        message: "Server error while creating staff", 
        error 
    });
  }
};

// @desc  Get all staff with filtering and pagination
// @route   GET /api/v1/staffs
export const getStaff = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, role, department } = req.query;

    const filter: any = {};
    if (role) filter.role = role;
    if (department) filter.department = department;

    const skip = (Number(page) - 1) * Number(limit);

    const [staff, total] = await Promise.all([
      Staff.find(filter).skip(skip).limit(Number(limit)),
      Staff.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      // The frontend expects the data nested this way
      data: {
        staffs: staff,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / Number(limit)),
        },
      }
    });
  } catch (error) {
    res.status(500).json({ 
        success: false,
        message: "Server error while fetching staff", 
        error 
    });
  }
};

// @desc    Get a single staff member by ID
// @route   GET /api/v1/staffs/:id
export const getStaffById = async (req: Request, res: Response) => {
  try {
    // Use findById for the default MongoDB _id
    const staffMember = await Staff.findById(req.params.id);
    if (!staffMember) {
      return res.status(404).json({ message: "Staff member not found" });
    }
    res.status(200).json(staffMember);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching staff member", error });
  }
};

// @desc    Update a staff member by ID
// @route   PUT /api/v1/staffs/:id
export const updateStaff = async (req: Request, res: Response) => {
  try {
    const updatedStaff = await Staff.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Return the updated doc and run schema validation
    );

    if (!updatedStaff) {
      return res.status(404).json({ message: "Staff member not found" });
    }
    res.status(200).json(updatedStaff);
  } catch (error) {
    res.status(500).json({ message: "Server error while updating staff.", error });
  }
};

// @desc    Delete a staff member by ID
// @route   DELETE /api/v1/staffs/:id
export const deleteStaff = async (req: Request, res: Response) => {
  try {
    const deletedStaff = await Staff.findByIdAndDelete(req.params.id);
    if (!deletedStaff) {
      return res.status(404).json({ message: "Staff member not found" });
    }
    res.status(200).json({ message: "Staff member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error while deleting staff", error });
  }
};