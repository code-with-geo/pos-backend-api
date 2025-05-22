import { Maintenance } from "../models/Maintenance.js";

export class MaintenanceController {
  static async create(req, res) {
    try {
      const record = await Maintenance.create(req.body);
      res.status(201).json({ maintenance: record });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Creating maintenance record failed" });
    }
  }

  static async getAll(req, res) {
    try {
      const records = await Maintenance.getAll();
      res.json({ maintenance: records });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching maintenance records failed" });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const record = await Maintenance.findById(id);
      if (!record) return res.status(404).json({ error: "Record not found" });
      res.json({ maintenance: record });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching maintenance record failed" });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const record = await Maintenance.findById(id);
      if (!record) return res.status(404).json({ error: "Record not found" });

      const updated = await Maintenance.update(id, req.body);
      res.json({
        message: "Record updated successfully",
        maintenance: updated,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Updating maintenance record failed" });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const record = await Maintenance.findById(id);
      if (!record) return res.status(404).json({ error: "Record not found" });

      const deleted = await Maintenance.delete(id);
      res.json({
        message: deleted ? "Record deleted successfully" : "Failed to delete",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Deleting maintenance record failed" });
    }
  }
}
