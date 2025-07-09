import { StockAdjustment } from "../models/StockAdjustment.js";

export class StockAdjustmentController {
  static async create(req, res) {
    try {
      const stockAdjustment = await StockAdjustment.create(req.body);
      res.status(201).json({ stockAdjustment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Creating stock adjustment failed" });
    }
  }

  static async getAll(req, res) {
    try {
      const stockAdjustments = await StockAdjustment.getAll();
      res.json({ stockAdjustments });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching stock adjustments failed" });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const stockAdjustment = await StockAdjustment.findById(id);
      if (!stockAdjustment)
        return res.status(404).json({ error: "Stock adjustment not found" });
      res.json({ stockAdjustment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching stock adjustment failed" });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const existing = await StockAdjustment.findById(id);
      if (!existing)
        return res.status(404).json({ error: "Stock adjustment not found" });

      const updated = await StockAdjustment.update(id, req.body);
      res.json({
        message: "Stock adjustment updated successfully",
        stockAdjustment: updated,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Updating stock adjustment failed" });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const existing = await StockAdjustment.findById(id);
      if (!existing)
        return res.status(404).json({ error: "Stock adjustment not found" });

      const deleted = await StockAdjustment.delete(id);
      res.json({
        message: deleted
          ? "Stock adjustment deleted successfully"
          : "Failed to delete stock adjustment",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Deleting stock adjustment failed" });
    }
  }

  static async createStockAdjustmentViewHandler(req, res) {
    try {
      await StockAdjustment.createStockAdjustmentView();
      res
        .status(200)
        .json({ message: "vw_stockAdjustment view created successfully" });
    } catch (err) {
      res.status(500).json({
        message: "Error creating vw_stockAdjustment view",
        error: err.message,
      });
    }
  }
}
