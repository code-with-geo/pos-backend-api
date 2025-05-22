import { Void } from "../models/Void.js";

export class VoidController {
  static async create(req, res) {
    try {
      const {
        invoice,
        pid,
        markupPrice,
        qty,
        discount,
        total,
        action,
        reason,
        date,
        cashier,
      } = req.body;
      const voidEntry = await Void.create(
        invoice,
        pid,
        markupPrice,
        qty,
        discount,
        total,
        action,
        reason,
        date,
        cashier
      );
      res.status(201).json({ voidEntry });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Creating void entry failed" });
    }
  }

  static async getAll(req, res) {
    try {
      const voidEntries = await Void.getAll();
      res.json({ voidEntries });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching void entries failed" });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const voidEntry = await Void.findById(id);
      if (!voidEntry)
        return res.status(404).json({ error: "Void entry not found" });
      res.json({ voidEntry });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching void entry failed" });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const {
        invoice,
        pid,
        markupPrice,
        qty,
        discount,
        total,
        action,
        reason,
        date,
        cashier,
      } = req.body;

      const existing = await Void.findById(id);
      if (!existing)
        return res.status(404).json({ error: "Void entry not found" });

      const updated = await Void.update(
        id,
        invoice,
        pid,
        markupPrice,
        qty,
        discount,
        total,
        action,
        reason,
        date,
        cashier
      );
      res.json({
        message: "Void entry updated successfully",
        voidEntry: updated,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Updating void entry failed" });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const existing = await Void.findById(id);
      if (!existing)
        return res.status(404).json({ error: "Void entry not found" });

      const deleted = await Void.delete(id);
      res.json({
        message: deleted
          ? "Void entry deleted successfully"
          : "Failed to delete void entry",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Deleting void entry failed" });
    }
  }
}
