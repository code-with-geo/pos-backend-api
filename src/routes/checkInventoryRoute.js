import express from "express";
import { CheckInventoryController } from "../controllers/checkInventoryController.js";

const router = express.Router();

router.post("/create", CheckInventoryController.createCheck);
router.get("/", CheckInventoryController.getAllChecks);
router.get("/:id", CheckInventoryController.getCheckById);
router.put("/update/:id", CheckInventoryController.updateCheck);
router.delete("/delete/:id", CheckInventoryController.deleteCheck);

export { router as CheckInventoryRouter };
