import dbConnection from "../config/databaseConfig.js";

export class Discounts {
  // Create a new discount
  static async createDiscount(name, percentage, status) {
    const [result] = await dbConnection.query(
      `INSERT INTO Discounts (Name, Percentage, Status) VALUES (?, ?, ?)`,
      [name, percentage, status]
    );
    return this.findById(result.insertId);
  }

  // Find discount by ID
  static async findById(discountId) {
    const [result] = await dbConnection.query(
      "SELECT * FROM Discounts WHERE DiscountId = ?",
      [discountId]
    );
    return result.length > 0 ? result[0] : null;
  }

  // Update discount details
  static async updateDiscount(discountId, name, percentage, status) {
    const [result] = await dbConnection.query(
      `UPDATE Discounts SET Name = ?, Percentage = ?, Status = ? WHERE DiscountId = ?`,
      [name, percentage, status, discountId]
    );
    return result.affectedRows > 0 ? this.findById(discountId) : null;
  }

  // Delete discount by ID
  static async deleteDiscount(discountId) {
    const [result] = await dbConnection.query(
      "DELETE FROM Discounts WHERE DiscountId = ?",
      [discountId]
    );
    return result.affectedRows > 0;
  }

  // Get all discounts
  static async getAllDiscounts() {
    const [result] = await dbConnection.query("SELECT * FROM Discounts");
    return result;
  }
}
