import { Inventory } from "../models/Inventory.js";

export class InventoryController {
  // Create a new inventory record
  static async createInventory(req, res) {
    try {
      const { specification, units, productId, locationId, status } = req.body;

      const newInventory = await Inventory.createInventory(
        specification,
        units,
        productId,
        locationId,
        status
      );
      res.status(201).json({ inventory: newInventory });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Creating inventory record failed" });
    }
  }

  // Get all inventory records
  static async getAllInventory(req, res) {
    try {
      const inventory = await Inventory.getAllInventory();
      res.json({ inventory });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching inventory failed" });
    }
  }

  // Get a single inventory record by ID
  static async getInventoryById(req, res) {
    try {
      const { id } = req.params;
      const inventory = await Inventory.findById(id);

      if (!inventory) {
        return res.status(404).json({ error: "Inventory record not found" });
      }

      res.json({ inventory });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching inventory record failed" });
    }
  }

  // Update inventory details
  static async updateInventory(req, res) {
    try {
      const { id } = req.params;
      const { specification, units, productId, locationId, status } = req.body;

      const inventory = await Inventory.findById(id);
      if (!inventory) {
        return res.status(404).json({ error: "Inventory record not found" });
      }

      const updatedInventory = await Inventory.updateInventory(
        id,
        specification,
        units,
        productId,
        locationId,
        status
      );
      res.json({
        message: "Inventory record updated successfully",
        inventory: updatedInventory,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Updating inventory record failed" });
    }
  }

  // Delete an inventory record
  static async deleteInventory(req, res) {
    try {
      const { id } = req.params;

      const inventory = await Inventory.findById(id);
      if (!inventory) {
        return res.status(404).json({ error: "Inventory record not found" });
      }

      const deleted = await Inventory.deleteInventory(id);
      if (deleted) {
        res.json({ message: "Inventory record deleted successfully" });
      } else {
        res.status(500).json({ error: "Failed to delete inventory record" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Inventory deletion failed" });
    }
  }
}
