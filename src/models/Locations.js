import dbConnection from "../config/databaseConfig.js";

export class Locations {
  constructor(locationId, name, status, locationType) {
    this.locationId = locationId;
    this.name = name;
    this.status = status;
    this.locationType = locationType;
  }
  // Create a new location
  static async createLocation(name, status, locationType) {
    const [result] = await dbConnection.query(
      "INSERT INTO Locations (Name, Status, LocationType) VALUES (?, ?, ?)",
      [name, status, locationType]
    );
    return this.findById(result.insertId);
  }

  // Find location by ID
  static async findById(locationId) {
    const [result] = await dbConnection.query(
      "SELECT * FROM Locations WHERE LocationId = ?",
      [locationId]
    );
    return result.length > 0 ? result[0] : null;
  }

  // Update location details
  static async updateLocation(locationId, name, status, locationType) {
    const [result] = await dbConnection.query(
      `UPDATE Locations 
         SET Name = ?, Status = ?, LocationType = ? 
         WHERE LocationId = ?`,
      [name, status, locationType, locationId]
    );
    return result.affectedRows > 0 ? this.findById(locationId) : null;
  }

  // Delete location by ID
  static async deleteLocation(locationId) {
    const [result] = await dbConnection.query(
      "DELETE FROM Locations WHERE LocationId = ?",
      [locationId]
    );
    return result.affectedRows > 0;
  }

  // Get all locations
  static async getAllLocations() {
    const [result] = await dbConnection.query("SELECT * FROM Locations");
    return result;
  }
}
