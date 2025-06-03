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

export { router as CartRouter };
