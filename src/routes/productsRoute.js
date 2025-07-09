import express from "express";
import { ProductsController } from "../controllers/productsController.js";
import { AuthMiddleware } from "../middelwares/authMiddleware.js";

const router = express.Router();

router.post("/create", AuthMiddleware.verifyToken, ProductsController.create);
router.get("/", AuthMiddleware.verifyToken, ProductsController.getAll);
router.get("/:id", AuthMiddleware.verifyToken, ProductsController.getById);
router.put(
  "/update/:id",
  AuthMiddleware.verifyToken,
  ProductsController.update
);
router.delete(
  "/delete/:id",
  AuthMiddleware.verifyToken,
  ProductsController.delete
);
router.post(
  "/create-stock-monitor-view",
  AuthMiddleware.verifyToken,
  ProductsController.createStockMonitorViewHandler
);

export { router as ProductsRoute };
