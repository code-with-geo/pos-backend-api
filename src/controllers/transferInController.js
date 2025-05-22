import { TransferIn } from "../models/TransferIn.js";

export class TransferInController {
  static async create(req, res) {
    try {
      const { reference, pid, qty, transferFrom, date, username } = req.body;
      const transferIn = await TransferIn.create(
        reference,
        pid,
        qty,
        transferFrom,
        date,
        username
      );
      res.status(201).json({ transferIn });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Creating transfer in failed" });
    }
  }

  static async getAll(req, res) {
    try {
      const transferIns = await TransferIn.getAll();
      res.json({ transferIns });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching transfer ins failed" });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const transferIn = await TransferIn.findById(id);
      if (!transferIn)
        return res.status(404).json({ error: "Transfer in not found" });
      res.json({ transferIn });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching transfer in failed" });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { reference, pid, qty, transferFrom, date, username } = req.body;

      const existing = await TransferIn.findById(id);
      if (!existing)
        return res.status(404).json({ error: "Transfer in not found" });

      const updated = await TransferIn.update(
        id,
        reference,
        pid,
        qty,
        transferFrom,
        date,
        username
      );
      res.json({
        message: "Transfer in updated successfully",
        transferIn: updated,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Updating transfer in failed" });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const existing = await TransferIn.findById(id);
      if (!existing)
        return res.status(404).json({ error: "Transfer in not found" });

      const deleted = await TransferIn.delete(id);
      res.json({
        message: deleted
          ? "Transfer in deleted successfully"
          : "Failed to delete transfer in",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Deleting transfer in failed" });
    }
  }
}
