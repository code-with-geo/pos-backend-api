import express from "express";
import { LogsController } from "../controllers/logsController.js";

const router = express.Router();

router.post("/create", LogsController.createLog);
router.get("/", LogsController.getAllLogs);
router.get("/:id", LogsController.getLogById);
router.put("/update/:id", LogsController.updateLog);
router.delete("/delete/:id", LogsController.deleteLog);

export { router as LogsRouter };
