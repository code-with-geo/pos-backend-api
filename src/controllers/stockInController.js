import { StockIn } from "../models/StockIn.js";

export class StockInController {
  static async create(req, res) {
    try {
      const stockIn = await StockIn.create(req.body);
      res.status(201).json({ stockIn });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Creating stock in record failed" });
    }
  }

  static async getAll(req, res) {
    try {
      const stockIns = await StockIn.getAll();
      res.json({ stockIns });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching stock in records failed" });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const stockIn = await StockIn.findById(id);
      if (!stockIn)
        return res.status(404).json({ error: "Stock in record not found" });
      res.json({ stockIn });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching stock in record failed" });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const existing = await StockIn.findById(id);
      if (!existing)
        return res.status(404).json({ error: "Stock in record not found" });

      const updated = await StockIn.update(id, req.body);
      res.json({
        message: "Stock in record updated successfully",
        stockIn: updated,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Updating stock in record failed" });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const existing = await StockIn.findById(id);
      if (!existing)
        return res.status(404).json({ error: "Stock in record not found" });

      const deleted = await StockIn.delete(id);
      res.json({
        message: deleted
          ? "Stock in record deleted successfully"
          : "Failed to delete stock in record",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Deleting stock in record failed" });
    }
  }

  static async getExpiryAlerts(req, res) {
    try {
      const { type } = req.query; // 'expired', 'near', or 'alert'
      const alertType = type || "alert"; // default to 'alert' if not provided

      const alerts = await StockIn.getExpiryAlert(alertType);
      res.status(200).json(alerts);
    } catch (error) {
      console.error("Error fetching expiry alerts:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async createStockInViewHandler(req, res) {
    try {
      await StockIn.createStockInView();
      res.status(200).json({ message: "vw_stockIn view created successfully" });
    } catch (err) {
      res.status(500).json({
        message: "Error creating vw_stockIn view",
        error: err.message,
      });
    }
  }
}
