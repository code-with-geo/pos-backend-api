import express from "express";
import { DiscountController } from "../controllers/discountsController.js";

const router = express.Router();

router.post("/create", DiscountController.createDiscount);
router.get("/", DiscountController.getAllDiscounts);
router.get("/:id", DiscountController.getDiscountById);
router.put("/update/:id", DiscountController.updateDiscount);
router.delete("/delete/:id", DiscountController.deleteDiscount);

export { router as DiscountsRouter };
