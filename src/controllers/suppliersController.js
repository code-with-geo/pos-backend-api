import { Suppliers } from "../models/Suppliers.js";

export class SupplierController {
  static async createSupplier(req, res) {
    try {
      const {
        supplierName,
        supplierAddress,
        contactPerson,
        telphone,
        locationId,
      } = req.body;

      // Check if supplier already exists
      const existingSupplier = await Suppliers.findByName(supplierName);
      if (existingSupplier) {
        return res.status(400).json({ error: "Supplier already exists" });
      }

      // Create supplier
      const newSupplier = await Suppliers.createSupplier(
        supplierName,
        supplierAddress,
        contactPerson,
        telphone,
        locationId
      );
      res.status(201).json({ supplier: newSupplier });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Creating supplier failed" });
    }
  }

  static async updateSupplier(req, res) {
    try {
      const { id } = req.params;
      const {
        supplierName,
        supplierAddress,
        contactPerson,
        telphone,
        locationId,
      } = req.body;

      // Check if supplier exists
      const supplier = await Suppliers.findById(id);
      if (!supplier) {
        return res.status(404).json({ error: "Supplier not found" });
      }

      // Update supplier
      const updatedSupplier = await Suppliers.updateSupplier(
        id,
        supplierName,
        supplierAddress,
        contactPerson,
        telphone,
        locationId
      );
      res.json({
        message: "Supplier updated successfully",
        supplier: updatedSupplier,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Supplier update failed" });
    }
  }

  static async deleteSupplier(req, res) {
    try {
      const { id } = req.params;

      // Check if supplier exists
      const supplier = await Suppliers.findById(id);
      if (!supplier) {
        return res.status(404).json({ error: "Supplier not found" });
      }

      // Delete supplier
      const deleted = await Suppliers.deleteSupplier(id);
      if (deleted) {
        res.json({ message: "Supplier deleted successfully" });
      } else {
        res.status(500).json({ error: "Failed to delete supplier" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Supplier deletion failed" });
    }
  }

  static async getAllSupplierByLocationId(req, res) {
    try {
      const { id } = req.params;
      const supplier = await Suppliers.getAllSuppliersByLocationId(id);
      console.log(supplier);
      res.status(200).json({ supplier: supplier });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Getting all suppliers failed" });
    }
  }
}
