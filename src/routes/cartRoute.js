import express from "express";
import { CartController } from "../controllers/cartController.js";

const router = express.Router();

router.post("/create", CartController.createCart);
router.get("/", CartController.getAllCarts);
router.get("/:id", CartController.getCartById);
router.put("/update/:id", CartController.updateCart);
router.delete("/delete/:id", CartController.deleteCart);

export { router as CartRouter };
