import { CheckInventory } from "../models/CheckInventory.js";

export class CheckInventoryController {
  static async createCheck(req, res) {
    try {
      const newCheck = await CheckInventory.createCheck(req.body);
      res.status(201).json({ check: newCheck });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Creating check inventory entry failed" });
    }
  }

  static async getAllChecks(req, res) {
    try {
      const checks = await CheckInventory.getAllChecks();
      res.json({ checks });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching inventory checks failed" });
    }
  }

  static async getCheckById(req, res) {
    try {
      const { id } = req.params;
      const check = await CheckInventory.findById(id);
      if (!check) return res.status(404).json({ error: "Check not found" });
      res.json({ check });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching check failed" });
    }
  }

  static async updateCheck(req, res) {
    try {
      const { id } = req.params;
      const checkExists = await CheckInventory.findById(id);
      if (!checkExists)
        return res.status(404).json({ error: "Check not found" });

      const updated = await CheckInventory.updateCheck(id, req.body);
      res.json({ message: "Check updated successfully", check: updated });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Updating check failed" });
    }
  }

  static async deleteCheck(req, res) {
    try {
      const { id } = req.params;
      const checkExists = await CheckInventory.findById(id);
      if (!checkExists)
        return res.status(404).json({ error: "Check not found" });

      const deleted = await CheckInventory.deleteCheck(id);
      res.json({
        message: deleted
          ? "Check deleted successfully"
          : "Failed to delete check",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Deleting check failed" });
    }
  }
}
