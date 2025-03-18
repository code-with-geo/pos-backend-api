import dbConnection from "../config/databaseConfig.js";

export class Products {
  // Create a new product
  static async createProduct(
    barcode,
    name,
    description,
    supplierPrice,
    retailPrice,
    wholesalePrice,
    reorderLevel,
    remarks,
    isVat,
    status,
    categoryId
  ) {
    const [result] = await dbConnection.query(
      `INSERT INTO Products 
      (Barcode, Name, Description, SupplierPrice, RetailPrice, WholesalePrice, ReorderLevel, Remarks, IsVat, Status, CategoryId) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        barcode,
        name,
        description,
        supplierPrice,
        retailPrice,
        wholesalePrice,
        reorderLevel,
        remarks,
        isVat,
        status,
        categoryId,
      ]
    );
    return this.findById(result.insertId);
  }

  // Find product by ID
  static async findById(id) {
    const [result] = await dbConnection.query(
      "SELECT * FROM Products WHERE Id = ?",
      [id]
    );
    return result.length > 0 ? result[0] : null;
  }

  // Update product details
  static async updateProduct(
    id,
    barcode,
    name,
    description,
    supplierPrice,
    retailPrice,
    wholesalePrice,
    reorderLevel,
    remarks,
    isVat,
    status,
    categoryId
  ) {
    const [result] = await dbConnection.query(
      `UPDATE Products 
      SET Barcode = ?, Name = ?, Description = ?, SupplierPrice = ?, RetailPrice = ?, WholesalePrice = ?, ReorderLevel = ?, Remarks = ?, IsVat = ?, Status = ?, CategoryId = ? 
      WHERE Id = ?`,
      [
        barcode,
        name,
        description,
        supplierPrice,
        retailPrice,
        wholesalePrice,
        reorderLevel,
        remarks,
        isVat,
        status,
        categoryId,
        id,
      ]
    );
    return result.affectedRows > 0 ? this.findById(id) : null;
  }

  // Delete product by ID
  static async deleteProduct(id) {
    const [result] = await dbConnection.query(
      "DELETE FROM Products WHERE Id = ?",
      [id]
    );
    return result.affectedRows > 0;
  }

  // Get all products
  static async getAllProducts() {
    const [result] = await dbConnection.query("SELECT * FROM Products");
    return result;
  }
}
