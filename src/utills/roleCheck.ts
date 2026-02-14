import { AuthRequest } from "../types/express";

export const requireRole = (
  req: AuthRequest,
  ...roles: ("admin" | "user" | "superadmin")[]
) => {
  if (!req.role || !roles.includes(req.role)) {
    const error = new Error("Access denied") as any;
    error.statusCode = 403;
    throw error;
  }
};
