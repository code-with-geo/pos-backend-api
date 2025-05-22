import express from "express";
import { TransferOutController } from "../controllers/transferOutController.js";

const router = express.Router();

router.post("/create", TransferOutController.create);
router.get("/", TransferOutController.getAll);
router.get("/:id", TransferOutController.getById);
router.put("/update/:id", TransferOutController.update);
router.delete("/delete/:id", TransferOutController.delete);

export { router as TransferOutRouter };
