import { Payment } from "../models/Payment.js";

export class PaymentController {
  static async create(req, res) {
    try {
      const payment = await Payment.create(req.body);
      res.status(201).json({ payment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Creating payment failed" });
    }
  }

  static async getAll(req, res) {
    try {
      const payments = await Payment.getAll();
      res.json({ payments });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching payments failed" });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const payment = await Payment.findById(id);
      if (!payment) return res.status(404).json({ error: "Payment not found" });
      res.json({ payment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching payment failed" });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const existing = await Payment.findById(id);
      if (!existing)
        return res.status(404).json({ error: "Payment not found" });

      const updated = await Payment.update(id, req.body);
      res.json({ message: "Payment updated successfully", payment: updated });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Updating payment failed" });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const existing = await Payment.findById(id);
      if (!existing)
        return res.status(404).json({ error: "Payment not found" });

      const deleted = await Payment.delete(id);
      res.json({
        message: deleted
          ? "Payment deleted successfully"
          : "Failed to delete payment",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Deleting payment failed" });
    }
  }
}
