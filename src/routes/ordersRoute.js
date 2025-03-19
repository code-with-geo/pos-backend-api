import express from "express";
import { OrderController } from "../controllers/ordersController.js";

const router = express.Router();

router.post("/create", OrderController.createOrder);
router.get("/:id", OrderController.getOrderById);

export { router as OrdersRouter };
