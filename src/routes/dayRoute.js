import express from "express";
import { DayController } from "../controllers/dayController.js";

const router = express.Router();

router.post("/create", DayController.createDay);
router.get("/", DayController.getAllDays);
router.get("/:id", DayController.getDayById);
router.put("/update/:id", DayController.updateDay);
router.delete("/delete/:id", DayController.deleteDay);

export { router as DayRouter };
