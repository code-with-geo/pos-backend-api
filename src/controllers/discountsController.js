import { Discounts } from "../models/Discounts.js";

export class DiscountController {
  // Create a new discount
  static async createDiscount(req, res) {
    try {
      const { name, percentage, status } = req.body;

      const newDiscount = await Discounts.createDiscount(
        name,
        percentage,
        status
      );
      res.status(201).json({ discount: newDiscount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Creating discount failed" });
    }
  }

  // Get all discounts
  static async getAllDiscounts(req, res) {
    try {
      const discounts = await Discounts.getAllDiscounts();
      res.json({ discounts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching discounts failed" });
    }
  }

  // Get a single discount by ID
  static async getDiscountById(req, res) {
    try {
      const { id } = req.params;
      const discount = await Discounts.findById(id);

      if (!discount) {
        return res.status(404).json({ error: "Discount not found" });
      }

      res.json({ discount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching discount failed" });
    }
  }

  // Update discount details
  static async updateDiscount(req, res) {
    try {
      const { id } = req.params;
      const { name, percentage, status } = req.body;

      const discount = await Discounts.findById(id);
      if (!discount) {
        return res.status(404).json({ error: "Discount not found" });
      }

      const updatedDiscount = await Discounts.updateDiscount(
        id,
        name,
        percentage,
        status
      );
      res.json({
        message: "Discount updated successfully",
        discount: updatedDiscount,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Updating discount failed" });
    }
  }

  // Delete a discount
  static async deleteDiscount(req, res) {
    try {
      const { id } = req.params;

      const discount = await Discounts.findById(id);
      if (!discount) {
        return res.status(404).json({ error: "Discount not found" });
      }

      const deleted = await Discounts.deleteDiscount(id);
      if (deleted) {
        res.json({ message: "Discount deleted successfully" });
      } else {
        res.status(500).json({ error: "Failed to delete discount" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Discount deletion failed" });
    }
  }
}
