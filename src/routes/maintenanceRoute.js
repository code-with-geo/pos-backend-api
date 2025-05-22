import express from "express";
import { MaintenanceController } from "../controllers/maintenanceController.js";

const router = express.Router();

router.post("/create", MaintenanceController.create);
router.get("/", MaintenanceController.getAll);
router.get("/:id", MaintenanceController.getById);
router.put("/update/:id", MaintenanceController.update);
router.delete("/delete/:id", MaintenanceController.delete);

export { router as MaintenanceRouter };
