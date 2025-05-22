import { Transactions } from "../models/Transactions.js";

export class TransactionsController {
  static async create(req, res) {
    try {
      const { invoice } = req.body;
      const transaction = await Transactions.create(invoice);
      res.status(201).json({ transaction });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Creating transaction failed" });
    }
  }

  static async getAll(req, res) {
    try {
      const transactions = await Transactions.getAll();
      res.json({ transactions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching transactions failed" });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const transaction = await Transactions.findById(id);
      if (!transaction)
        return res.status(404).json({ error: "Transaction not found" });
      res.json({ transaction });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching transaction failed" });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { invoice } = req.body;
      const existing = await Transactions.findById(id);
      if (!existing)
        return res.status(404).json({ error: "Transaction not found" });

      const updated = await Transactions.update(id, invoice);
      res.json({
        message: "Transaction updated successfully",
        transaction: updated,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Updating transaction failed" });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const existing = await Transactions.findById(id);
      if (!existing)
        return res.status(404).json({ error: "Transaction not found" });

      const deleted = await Transactions.delete(id);
      res.json({
        message: deleted
          ? "Transaction deleted successfully"
          : "Failed to delete transaction",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Deleting transaction failed" });
    }
  }
}
