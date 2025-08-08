import express from "express";
import { SupplierController } from "../controllers/suppliersController.js";

const router = express.Router();

router.post("/create", SupplierController.createSupplier);
router.put("/update/:id", SupplierController.updateSupplier);
router.delete("/delete/:id", SupplierController.deleteSupplier);
router.get("/:id", SupplierController.getAllSupplierByLocationId);

export { router as SuppliersRoute };
