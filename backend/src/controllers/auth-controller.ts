import type { Request, Response, NextFunction } from "express";
import type { LoginType } from "../types/auth";
import Staff from "../models/staff.model";
import { AuthenticationError } from "../errors/Authentication-error";
import type { JwtPayload, SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import serverConfig from "../config/server-config";
import { StatusCodes } from "http-status-codes";

export const login = async (
  req: Request<{}, {}, LoginType>,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  const staff = await Staff.findOne({ email: email.toLowerCase() }).select(
    "+password"
  );

  if (!staff) {
    return new AuthenticationError("Invalid credentials");
  }

  const isValidPassword = staff.comparePassword(password);

  if (!isValidPassword) {
    return new AuthenticationError("Invalid credentials");
  }

  const payload: JwtPayload = {
    staffId: staff._id,
    role: staff.role,
  };
  // const options: SignOptions = {
  //   expiresIn: serverConfig.JWT_ACCESS_EXPIRES! || "15m",
  // };
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET! as string);

  const refreshToken = jwt.sign(
    { staffId: staff._id },
    serverConfig.JWT_REFRESH_SECRET!
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(StatusCodes.OK).json({
    success: true,
    data: {
      accessToken,
      user: {
        id: staff._id,
        employeeId: staff.employeeId,
        firstName: staff.firstName,
        lastName: staff.lastName,
        email: staff.email,
        role: staff.role,
        permissions: staff.permissions,
        department: staff.department,
      },
    },
  });
};

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      error: "Refresh token not found",
    });
  }

  const decoded = jwt.verify(
    refreshToken,
    serverConfig.JWT_REFRESH_SECRET!
  ) as { staffId: string };

  const staff = await Staff.findById(decoded.staffId);

  if (!staff || staff.refreshToken !== refreshToken || !staff.isActive) {
    return res.status(401).json({
      success: false,
      error: "Invalid refresh token",
    });
  }

  staff.refreshToken = null;
  await staff.save();

  const payload: JwtPayload = {
    staffId: staff._id,
    employeeId: staff.employeeId,
    role: staff.role,
  };

  const newAccessToken = jwt.sign(payload, serverConfig.JWT_SECRET!, {});

  const newRefreshToken = jwt.sign(
    payload,
    serverConfig.JWT_REFRESH_SECRET!,
    {}
  );

  staff.refreshToken = newRefreshToken;
  await staff.save();

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(StatusCodes.OK).json({
    success: true,
    data: {
      accessToken: newAccessToken,
    },
  });
};

export const register = async (req: Request, res: Response) => {
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
