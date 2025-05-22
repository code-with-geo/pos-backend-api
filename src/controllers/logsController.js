import { Logs } from "../models/Logs.js";

export class LogsController {
  static async createLog(req, res) {
    try {
      const log = await Logs.createLog(req.body);
      res.status(201).json({ log });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Creating log entry failed" });
    }
  }

  static async getAllLogs(req, res) {
    try {
      const logs = await Logs.getAllLogs();
      res.json({ logs });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching logs failed" });
    }
  }

  static async getLogById(req, res) {
    try {
      const { id } = req.params;
      const log = await Logs.findById(id);
      if (!log) return res.status(404).json({ error: "Log not found" });
      res.json({ log });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching log failed" });
    }
  }

  static async updateLog(req, res) {
    try {
      const { id } = req.params;
      const logExists = await Logs.findById(id);
      if (!logExists) return res.status(404).json({ error: "Log not found" });

      const updated = await Logs.updateLog(id, req.body);
      res.json({ message: "Log updated successfully", log: updated });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Updating log failed" });
    }
  }

  static async deleteLog(req, res) {
    try {
      const { id } = req.params;
      const logExists = await Logs.findById(id);
      if (!logExists) return res.status(404).json({ error: "Log not found" });

      const deleted = await Logs.deleteLog(id);
      res.json({
        message: deleted ? "Log deleted successfully" : "Failed to delete log",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Deleting log failed" });
    }
  }
}
