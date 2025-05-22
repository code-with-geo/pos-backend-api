import { Day } from "../models/Day.js";

export class DayController {
  static async createDay(req, res) {
    try {
      const newDay = await Day.createDay(req.body);
      res.status(201).json({ day: newDay });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Creating day record failed" });
    }
  }

  static async getAllDays(req, res) {
    try {
      const days = await Day.getAllDays();
      res.json({ days });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching day records failed" });
    }
  }

  static async getDayById(req, res) {
    try {
      const { id } = req.params;
      const day = await Day.findById(id);
      if (!day) return res.status(404).json({ error: "Day not found" });
      res.json({ day });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching day failed" });
    }
  }

  static async updateDay(req, res) {
    try {
      const { id } = req.params;
      const dayExists = await Day.findById(id);
      if (!dayExists) return res.status(404).json({ error: "Day not found" });

      const updated = await Day.updateDay(id, req.body);
      res.json({ message: "Day updated successfully", day: updated });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Updating day failed" });
    }
  }

  static async deleteDay(req, res) {
    try {
      const { id } = req.params;
      const dayExists = await Day.findById(id);
      if (!dayExists) return res.status(404).json({ error: "Day not found" });

      const deleted = await Day.deleteDay(id);
      res.json({
        message: deleted ? "Day deleted successfully" : "Failed to delete day",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Deleting day failed" });
    }
  }
}
