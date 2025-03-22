import express from "express";
import { DeliveryController } from "../controllers/deliveryController.js";

const router = express.Router();

router.post("/create", DeliveryController.createDelivery);
router.post("/completeDelivery", DeliveryController.completeDelivery);
router.get(
  "/locations/:id",
  DeliveryController.getAllPendingDeliveryByLocationId
);
export { router as DeliveryRouter };
