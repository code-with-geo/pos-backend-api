import express from "express";
import { StockAdjustmentController } from "../controllers/stockAdjustmentController.js";

const router = express.Router();

router.post("/create", StockAdjustmentController.create);
router.get("/", StockAdjustmentController.getAll);
router.get("/:id", StockAdjustmentController.getById);
router.put("/update/:id", StockAdjustmentController.update);
router.delete("/delete/:id", StockAdjustmentController.delete);

export { router as StockAdjustmentRouter };
