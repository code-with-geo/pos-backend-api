import express from "express";
import { StockAdjustmentController } from "../controllers/stockAdjustmentController.js";
import { AuthMiddleware } from "../middelwares/authMiddleware.js";

const router = express.Router();

router.post(
  "/create",
  AuthMiddleware.verifyToken,
  StockAdjustmentController.create
);
router.get("/", AuthMiddleware.verifyToken, StockAdjustmentController.getAll);
router.get(
  "/:id",
  AuthMiddleware.verifyToken,
  StockAdjustmentController.getById
);
router.put(
  "/update/:id",
  AuthMiddleware.verifyToken,
  StockAdjustmentController.update
);
router.delete(
  "/delete/:id",
  AuthMiddleware.verifyToken,
  StockAdjustmentController.delete
);
router.post(
  "/create-stock-adjustment-view",
  AuthMiddleware.verifyToken,
  StockAdjustmentController.createStockAdjustmentViewHandler
);

export { router as StockAdjustmentRouter };
