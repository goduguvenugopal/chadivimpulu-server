import { Request, Response } from "express";
import Marriage from "../models/Marriage";
import { asyncHandler } from "../utills/asyncHandler"

interface CustomError extends Error {
  statusCode?: number;
}

/**
 * @desc Create Marriage
 */
export const createMarriage = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      marriageName,
      marriageDate,
      location,
      adminMobileNumber,
      upiId,
      upiPayeeName,
      role,
    } = req.body;

    if (
      !marriageName ||
      !marriageDate ||
      !location ||
      !adminMobileNumber ||
      !upiId ||
      !upiPayeeName
    ) {
      const error = new Error("All fields are required") as CustomError;
      error.statusCode = 400;
      throw error;
    }

    const marriage = await Marriage.create({
      marriageName,
      marriageDate,
      location,
      adminMobileNumber,
      upiId,
      upiPayeeName,
      role,
    });

    res.status(201).json({
      success: true,
      data: marriage,
    });
  }
);

/**
 * @desc Get All Marriages
 */
export const getAllMarriages = asyncHandler(
  async (req: Request, res: Response) => {
    const marriages = await Marriage.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: marriages.length,
      data: marriages,
    });
  }
);

/**
 * @desc Get Single Marriage
 */
export const getMarriageById = asyncHandler(
  async (req: Request, res: Response) => {
    const marriage = await Marriage.findById(req.params.id);

    if (!marriage) {
      const error = new Error("Marriage not found") as CustomError;
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: marriage,
    });
  }
);

/**
 * @desc Update Marriage
 */
export const updateMarriage = asyncHandler(
  async (req: Request, res: Response) => {
    const marriage = await Marriage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!marriage) {
      const error = new Error("Marriage not found") as CustomError;
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: marriage,
    });
  }
);

/**
 * @desc Delete Marriage
 */
export const deleteMarriage = asyncHandler(
  async (req: Request, res: Response) => {
    const marriage = await Marriage.findByIdAndDelete(req.params.id);

    if (!marriage) {
      const error = new Error("Marriage not found") as CustomError;
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Marriage deleted successfully",
    });
  }
);
