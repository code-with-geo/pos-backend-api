import express from "express";
import { StockInController } from "../controllers/stockInController.js";

const router = express.Router();

router.post("/create", StockInController.create);
router.get("/", StockInController.getAll);
router.get("/:id", StockInController.getById);
router.put("/update/:id", StockInController.update);
router.delete("/delete/:id", StockInController.delete);

export { router as StockInRouter };
