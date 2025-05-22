import express from "express";
import { PaymentController } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create", PaymentController.create);
router.get("/", PaymentController.getAll);
router.get("/:id", PaymentController.getById);
router.put("/update/:id", PaymentController.update);
router.delete("/delete/:id", PaymentController.delete);

export { router as PaymentRouter };
