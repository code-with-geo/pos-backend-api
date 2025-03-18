import { Locations } from "../models/Locations.js";

export class LocationController {
  // Create a new location
  static async createLocation(req, res) {
    try {
      const { name, status, locationType } = req.body;

      // Create location
      const newLocation = await Locations.createLocation(
        name,
        status,
        locationType
      );
      res.status(201).json({ location: newLocation });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Creating location failed" });
    }
  }

  // Get all locations
  static async getAllLocations(req, res) {
    try {
      const locations = await Locations.getAllLocations();
      res.json({ locations });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching locations failed" });
    }
  }

  // Get a single location by ID
  static async getLocationById(req, res) {
    try {
      const { id } = req.params;
      const location = await Locations.findById(id);

      if (!location) {
        return res.status(404).json({ error: "Location not found" });
      }

      res.json({ location });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching location failed" });
    }
  }

  // Update location details
  static async updateLocation(req, res) {
    try {
      const { id } = req.params;
      const { name, status, locationType } = req.body;

      // Check if location exists
      const location = await Locations.findById(id);
      if (!location) {
        return res.status(404).json({ error: "Location not found" });
      }

      // Update location
      const updatedLocation = await Locations.updateLocation(
        id,
        name,
        status,
        locationType
      );
      res.json({
        message: "Location updated successfully",
        location: updatedLocation,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Updating location failed" });
    }
  }

  // Delete a location
  static async deleteLocation(req, res) {
    try {
      const { id } = req.params;

      // Check if location exists
      const location = await Locations.findById(id);
      if (!location) {
        return res.status(404).json({ error: "Location not found" });
      }

      // Delete location
      const deleted = await Locations.deleteLocation(id);
      if (deleted) {
        res.json({ message: "Location deleted successfully" });
      } else {
        res.status(500).json({ error: "Failed to delete location" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Location deletion failed" });
    }
  }
}
