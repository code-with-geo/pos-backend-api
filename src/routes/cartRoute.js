import express from "express";
import { CartController } from "../controllers/cartController.js";
import { AuthMiddleware } from "../middelwares/authMiddleware.js";

const router = express.Router();

router.post("/create", AuthMiddleware.verifyToken, CartController.createCart);
router.get("/", AuthMiddleware.verifyToken, CartController.getAllCarts);
router.get("/:id", AuthMiddleware.verifyToken, CartController.getCartById);
router.put(
  "/update/:id",
  AuthMiddleware.verifyToken,
  CartController.updateCart
);
router.delete(
  "/delete/:id",
  AuthMiddleware.verifyToken,
  CartController.deleteCart
);
router.post(
  "/create-cart-view",
  AuthMiddleware.verifyToken,
  CartController.createCartViewHandler
); //Use to create vw_cart

router.post(
  "/create-summary-view",
  AuthMiddleware.verifyToken,
  CartController.createSummaryViewHandler
); //Use to create vw_SalesSummary

export { router as CartRouter };
