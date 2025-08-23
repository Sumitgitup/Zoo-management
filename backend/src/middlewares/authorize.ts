import type { Request, Response } from "express";
import type { JwtPayload } from "jsonwebtoken";

export const authorize = (
  requiredRoles: string[] | string,
  requiredPermissions?: string[]
) => {
  return (
    req: Request & { user?: JwtPayload },
    res: Response,
    next: Function
  ) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Authentication required",
      });
    }

    // Check role
    const roles = Array.isArray(requiredRoles)
      ? requiredRoles
      : [requiredRoles];
    const hasRole = roles.includes(user.role) || user.role === "Admin"; // Admin has access to everything

    if (!hasRole) {
      return res.status(403).json({
        success: false,
        error: "Insufficient role privileges",
      });
    }

    // Check permissions if specified
    if (requiredPermissions && requiredPermissions.length > 0) {
      const hasPermission = requiredPermissions.every(
        (permission) =>
          user.permissions.includes(permission) || user.role === "Admin"
      );

      if (!hasPermission) {
        return res.status(403).json({
          success: false,
          error: "Insufficient permissions",
        });
      }
    }

    next();
  };
};
