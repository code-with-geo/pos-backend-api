import { TransferOut } from "../models/TransferOut.js";

export class TransferOutController {
  static async create(req, res) {
    try {
      const { reference, pid, qty, transferTo, date, username } = req.body;
      const transferOut = await TransferOut.create(
        reference,
        pid,
        qty,
        transferTo,
        date,
        username
      );
      res.status(201).json({ transferOut });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Creating transfer out failed" });
    }
  }

  static async getAll(req, res) {
    try {
      const transferOuts = await TransferOut.getAll();
      res.json({ transferOuts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching transfer outs failed" });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const transferOut = await TransferOut.findById(id);
      if (!transferOut)
        return res.status(404).json({ error: "Transfer out not found" });
      res.json({ transferOut });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching transfer out failed" });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { reference, pid, qty, transferTo, date, username } = req.body;

      const existing = await TransferOut.findById(id);
      if (!existing)
        return res.status(404).json({ error: "Transfer out not found" });

      const updated = await TransferOut.update(
        id,
        reference,
        pid,
        qty,
        transferTo,
        date,
        username
      );
      res.json({
        message: "Transfer out updated successfully",
        transferOut: updated,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Updating transfer out failed" });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const existing = await TransferOut.findById(id);
      if (!existing)
        return res.status(404).json({ error: "Transfer out not found" });

      const deleted = await TransferOut.delete(id);
      res.json({
        message: deleted
          ? "Transfer out deleted successfully"
          : "Failed to delete transfer out",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Deleting transfer out failed" });
    }
  }
}
