import dbConnection from "../config/databaseConfig.js";

export class Category {
  // Create a new category
  static async createCategory(name, status) {
    const [result] = await dbConnection.query(
      "INSERT INTO Category (Name, Status) VALUES (?, ?)",
      [name, status]
    );
    return this.findById(result.insertId);
  }

  // Find category by ID
  static async findById(categoryId) {
    const [result] = await dbConnection.query(
      "SELECT * FROM Category WHERE CategoryId = ?",
      [categoryId]
    );
    return result.length > 0 ? result[0] : null;
  }

  // Update category details
  static async updateCategory(categoryId, name, status) {
    const [result] = await dbConnection.query(
      `UPDATE Category 
       SET Name = ?, Status = ? 
       WHERE CategoryId = ?`,
      [name, status, categoryId]
    );
    return result.affectedRows > 0 ? this.findById(categoryId) : null;
  }

  // Delete category by ID
  static async deleteCategory(categoryId) {
    const [result] = await dbConnection.query(
      "DELETE FROM Category WHERE CategoryId = ?",
      [categoryId]
    );
    return result.affectedRows > 0;
  }

  // Get all categories
  static async getAllCategories() {
    const [result] = await dbConnection.query("SELECT * FROM Category");
    return result;
  }
}
