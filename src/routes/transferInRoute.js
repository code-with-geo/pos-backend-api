import express from "express";
import { TransferInController } from "../controllers/transferInController.js";

const router = express.Router();

router.post("/create", TransferInController.create);
router.get("/", TransferInController.getAll);
router.get("/:id", TransferInController.getById);
router.put("/update/:id", TransferInController.update);
router.delete("/delete/:id", TransferInController.delete);

export { router as TransferInRouter };
