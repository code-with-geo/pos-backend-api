import express from "express";
import { ExpensesController } from "../controllers/expensesController.js";

const router = express.Router();

router.post("/create", ExpensesController.createExpense);
router.get("/", ExpensesController.getAllExpenses);
router.get("/:id", ExpensesController.getExpenseById);
router.put("/update/:id", ExpensesController.updateExpense);
router.delete("/delete/:id", ExpensesController.deleteExpense);

export { router as ExpensesRouter };
