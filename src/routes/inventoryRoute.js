import express from "express";
import { InventoryController } from "../controllers/inventoryController.js";

const router = express.Router();

router.post("/create", InventoryController.createInventory);
router.get("/", InventoryController.getAllInventory);
router.get("/:id", InventoryController.getInventoryById);
router.put("/update/:id", InventoryController.updateInventory);
router.delete("/delete/:id", InventoryController.deleteInventory);

export { router as InventoryRouter };
