import { Expenses } from "../models/Expenses.js";

export class ExpensesController {
  static async createExpense(req, res) {
    try {
      const expense = await Expenses.createExpense(req.body);
      res.status(201).json({ expense });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Creating expense failed" });
    }
  }

  static async getAllExpenses(req, res) {
    try {
      const expenses = await Expenses.getAllExpenses();
      res.json({ expenses });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching expenses failed" });
    }
  }

  static async getExpenseById(req, res) {
    try {
      const { id } = req.params;
      const expense = await Expenses.findById(id);
      if (!expense) return res.status(404).json({ error: "Expense not found" });
      res.json({ expense });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching expense failed" });
    }
  }

  static async updateExpense(req, res) {
    try {
      const { id } = req.params;
      const expenseExists = await Expenses.findById(id);
      if (!expenseExists)
        return res.status(404).json({ error: "Expense not found" });

      const updated = await Expenses.updateExpense(id, req.body);
      res.json({ message: "Expense updated successfully", expense: updated });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Updating expense failed" });
    }
  }

  static async deleteExpense(req, res) {
    try {
      const { id } = req.params;
      const expenseExists = await Expenses.findById(id);
      if (!expenseExists)
        return res.status(404).json({ error: "Expense not found" });

      const deleted = await Expenses.deleteExpense(id);
      res.json({
        message: deleted
          ? "Expense deleted successfully"
          : "Failed to delete expense",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Deleting expense failed" });
    }
  }
}
