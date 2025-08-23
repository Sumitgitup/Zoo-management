import type { Request, Response } from "express";
import Staff from "../models/staff.model";

// @desc    Create new staff
export const createStaff = async (req: Request, res: Response) => {
  try {
    const newStaff = new Staff(req.body);
    const savedStaff = await newStaff.save();
    res.status(201).json(savedStaff);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error while creating staff", error });
  }
};

// @desc    Get all staff
export const getStaff = async (req: Request, res: Response) => {
  try {
    const staff = await Staff.find({});
    res.status(200).json(staff);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error while fetching staff", error });
  }
};

// @desc    Get a single staff member by ID
export const getStaffById = async (req: Request, res: Response) => {
  try {
    const staffMember = await Staff.findById(req.params.id);
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

// @desc    Update a staff member by ID
export const updateStaff = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedStaff = await Staff.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedStaff) {
      return res.status(404).json({ message: "Staff member not found" });
    }
    res.status(200).json(updatedStaff);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error while updating staff", error });
  }
};

// @desc    Delete a staff member by ID
export const deleteStaff = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedStaff = await Staff.findByIdAndDelete(id);
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
