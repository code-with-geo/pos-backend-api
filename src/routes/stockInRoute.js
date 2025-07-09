import express from "express";
import { StockInController } from "../controllers/stockInController.js";
import { AuthMiddleware } from "../middelwares/authMiddleware.js";

const router = express.Router();

router.post("/create", AuthMiddleware.verifyToken, StockInController.create);
router.get("/", AuthMiddleware.verifyToken, StockInController.getAll);
router.get("/:id", AuthMiddleware.verifyToken, StockInController.getById);
router.put("/update/:id", AuthMiddleware.verifyToken, StockInController.update);
router.delete(
  "/delete/:id",
  AuthMiddleware.verifyToken,
  StockInController.delete
);
router.get(
  "/expiry-alerts",
  AuthMiddleware.verifyToken,
  StockInController.getExpiryAlerts
);
router.post(
  "/create-stock-in-view",
  AuthMiddleware.verifyToken,
  StockInController.createStockInViewHandler
);

export { router as StockInRouter };
