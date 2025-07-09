import { Products } from "../models/Products.js";

export class ProductsController {
  static async create(req, res) {
    try {
      const product = await Products.create(req.body);
      res.status(201).json({ product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Creating product failed" });
    }
  }

  static async getAll(req, res) {
    try {
      const products = await Products.getAll();
      res.json({ products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching products failed" });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const product = await Products.findById(id);
      if (!product) return res.status(404).json({ error: "Product not found" });
      res.json({ product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching product failed" });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;

      const existing = await Products.findById(id);
      if (!existing)
        return res.status(404).json({ error: "Product not found" });

      const updated = await Products.update(id, req.body);
      res.json({ message: "Product updated successfully", product: updated });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Updating product failed" });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;

      const existing = await Products.findById(id);
      if (!existing)
        return res.status(404).json({ error: "Product not found" });

      const deleted = await Products.delete(id);
      res.json({
        message: deleted
          ? "Product deleted successfully"
          : "Failed to delete product",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Deleting product failed" });
    }
  }

  static async createStockMonitorViewHandler(req, res) {
    try {
      await Products.createStockMonitorView();
      res
        .status(200)
        .json({ message: "vw_stockMonitor view created successfully" });
    } catch (err) {
      res.status(500).json({
        message: "Error creating vw_stockMonitor view",
        error: err.message,
      });
    }
  }
}
