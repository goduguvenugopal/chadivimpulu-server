import { Request } from "express";

export interface AuthRequest extends Request {
  marriageId?: string;
  role? : "admin" | "user" | "superadmin"
}
