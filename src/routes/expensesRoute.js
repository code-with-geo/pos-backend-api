import express from "express";
import { ExpensesController } from "../controllers/expensesController.js";
import { AuthMiddleware } from "../middelwares/authMiddleware.js";

const router = express.Router();

router.post(
  "/create",
  AuthMiddleware.verifyToken,
  ExpensesController.createExpense
);
router.get("/", AuthMiddleware.verifyToken, ExpensesController.getAllExpenses);
router.get(
  "/:id",
  AuthMiddleware.verifyToken,
  ExpensesController.getExpenseById
);
router.put(
  "/update/:id",
  AuthMiddleware.verifyToken,
  ExpensesController.updateExpense
);
router.delete(
  "/delete/:id",
  AuthMiddleware.verifyToken,
  ExpensesController.deleteExpense
);

export { router as ExpensesRouter };
