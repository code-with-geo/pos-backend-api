import express from "express";
import { DeliveryController } from "../controllers/deliveryController.js";

const router = express.Router();

router.post("/create", DeliveryController.createDelivery);

export { router as DeliveryRouter };
