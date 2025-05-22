import express from "express";
import { TransactionsController } from "../controllers/transactionsController.js";

const router = express.Router();

router.post("/create", TransactionsController.create);
router.get("/", TransactionsController.getAll);
router.get("/:id", TransactionsController.getById);
router.put("/update/:id", TransactionsController.update);
router.delete("/delete/:id", TransactionsController.delete);

export { router as TransactionsRouter };
