import dbConnection from "../config/databaseConfig.js";

export class Suppliers {
  constructor(
    id,
    supplierName,
    supplierAddress,
    contactPerson,
    telphone,
    locationId
  ) {
    this.id = id;
    this.supplierName = supplierName;
    this.supplierAddress = supplierAddress;
    this.contactPerson = contactPerson;
    this.telphone = telphone;
    this.locationId = locationId;
  }

  static async createSupplier(
    supplierName,
    supplierAddress,
    contactPerson,
    telphone,
    locationId
  ) {
    const [result] = await dbConnection.query(
      "INSERT INTO Supplier (supplierName, supplierAddress, contactPerson, telphone, dateAdded, locationId) VALUES (?, ?, ?, ?, ?, ?)",
      [
        supplierName,
        supplierAddress,
        contactPerson,
        telphone,
        new Date(),
        locationId,
      ]
    );
    return this.findById(result.insertId);
  }

  // Find supplier by ID
  static async findById(id) {
    const [result] = await dbConnection.query(
      "SELECT * FROM Supplier WHERE Id = ?",
      [id]
    );
    return result.length > 0 ? result[0] : null;
  }

  static async findByName(name) {
    const [result] = await dbConnection.query(
      "SELECT * FROM Supplier WHERE supplierName = ?",
      [name]
    );
    return result.length > 0 ? result[0] : null;
  }

  // Update supplier details
  static async updateSupplier(
    id,
    supplierName,
    supplierAddress,
    contactPerson,
    telphone,
    locationId
  ) {
    const [result] = await dbConnection.query(
      `UPDATE Supplier 
       SET supplierName = ?, supplierAddress = ?, contactPerson = ?, telphone = ?, locationId = ? 
       WHERE Id = ?`,
      [supplierName, supplierAddress, contactPerson, telphone, locationId, id]
    );
    return result.affectedRows > 0 ? this.findById(id) : null;
  }

  // Delete supplier by ID
  static async deleteSupplier(id) {
    const [result] = await dbConnection.query(
      "DELETE FROM Supplier WHERE Id = ?",
      [id]
    );
    return result.affectedRows > 0;
  }

  static async getAllSuppliersByLocationId(locationId) {
    const [result] = await dbConnection.query(
      "SELECT * FROM Supplier WHERE locationId = ?",
      [locationId]
    );
    return result;
  }
}
