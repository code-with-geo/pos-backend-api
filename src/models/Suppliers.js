import dbConnection from "../config/databaseConfig.js";

export class Suppliers {
  constructor(supplierId, name, address, contactPerson, contactNo, status) {
    this.supplierId = supplierId;
    this.name = name;
    this.address = address;
    this.contactPerson = contactPerson;
    this.contactNo = contactNo;
    this.status = status;
  }

  static async createSupplier(name, contactPerson, contactNo, address, status) {
    const [result] = await dbConnection.query(
      "INSERT INTO Suppliers (Name, Address, ContactPerson, ContactNo, Status) VALUES (?, ?, ?, ?, ?)",
      [name, address, contactPerson, contactNo, status]
    );
    return this.findById(result.insertId);
  }

  // Find supplier by ID
  static async findById(id) {
    const [result] = await dbConnection.query(
      "SELECT * FROM Suppliers WHERE SupplierId = ?",
      [id]
    );
    return result.length > 0 ? result[0] : null;
  }

  static async findByName(name) {
    const [result] = await dbConnection.query(
      "SELECT * FROM Suppliers WHERE Name = ?",
      [name]
    );
    return result.length > 0 ? result[0] : null;
  }

  // Update supplier details
  static async updateSupplier(
    id,
    name,
    contactPerson,
    contactNo,
    address,
    status
  ) {
    const [result] = await dbConnection.query(
      `UPDATE Suppliers 
       SET Name = ?, ContactPerson = ?, ContactNo = ?, Address = ?, Status = ? 
       WHERE SupplierId = ?`,
      [name, contactPerson, contactNo, address, status, id]
    );
    return result.affectedRows > 0 ? this.findById(id) : null;
  }

  // Delete supplier by ID
  static async deleteSupplier(id) {
    const [result] = await dbConnection.query(
      "DELETE FROM Suppliers WHERE SupplierId = ?",
      [id]
    );
    return result.affectedRows > 0;
  }
}
