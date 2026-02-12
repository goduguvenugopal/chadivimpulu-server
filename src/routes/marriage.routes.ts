import express from "express";
import {
  createMarriage,
  getAllMarriages,
  getMarriageById,
  updateMarriage,
  deleteMarriage,
} from "../controllers/marriage.controller";

const router = express.Router();

router.post("/", createMarriage);
router.get("/", getAllMarriages);
router.get("/:id", getMarriageById);
router.put("/:id", updateMarriage);
router.delete("/:id", deleteMarriage);

export default router;
