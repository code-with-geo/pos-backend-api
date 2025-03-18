import dbConnection from "../config/databaseConfig.js";

export class Inventory {
  // Create a new inventory record
  static async createInventory(
    specification,
    units,
    productId,
    locationId,
    status
  ) {
    const [result] = await dbConnection.query(
      `INSERT INTO Inventory (Specification, Units, ProductId, LocationId, Status) VALUES (?, ?, ?, ?, ?)`,
      [specification, units, productId, locationId, status]
    );
    return this.findById(result.insertId);
  }

  // Find inventory by ID
  static async findById(inventoryId) {
    const [result] = await dbConnection.query(
      "SELECT * FROM Inventory WHERE InventoryId = ?",
      [inventoryId]
    );
    return result.length > 0 ? result[0] : null;
  }

  // Update inventory details
  static async updateInventory(
    inventoryId,
    specification,
    units,
    productId,
    locationId,
    status
  ) {
    const [result] = await dbConnection.query(
      `UPDATE Inventory SET Specification = ?, Units = ?, ProductId = ?, LocationId = ?, Status = ? WHERE InventoryId = ?`,
      [specification, units, productId, locationId, status, inventoryId]
    );
    return result.affectedRows > 0 ? this.findById(inventoryId) : null;
  }

  // Delete inventory by ID
  static async deleteInventory(inventoryId) {
    const [result] = await dbConnection.query(
      "DELETE FROM Inventory WHERE InventoryId = ?",
      [inventoryId]
    );
    return result.affectedRows > 0;
  }

  // Get all inventory records
  static async getAllInventory() {
    const [result] = await dbConnection.query("SELECT * FROM Inventory");
    return result;
  }
}
