import dbConnection from "../config/databaseConfig.js";

export class Maintenance {
  static async create(data) {
    const {
      storeName,
      storeAddress,
      telphone,
      email,
      tinNo,
      tax,
      currency,
      logo,
      allowPrinting,
    } = data;

    const [result] = await dbConnection.query(
      `INSERT INTO Maintenance 
       (storeName, storeAddress, telphone, email, tinNo, tax, currency, logo, allowPrinting)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        storeName,
        storeAddress,
        telphone,
        email,
        tinNo,
        tax,
        currency,
        logo,
        allowPrinting,
      ]
    );
    return this.findById(result.insertId);
  }

  static async findById(id) {
    const [result] = await dbConnection.query(
      "SELECT * FROM Maintenance WHERE id = ?",
      [id]
    );
    return result.length > 0 ? result[0] : null;
  }

  static async getAll() {
    const [result] = await dbConnection.query("SELECT * FROM Maintenance");
    return result;
  }

  static async update(id, data) {
    const {
      storeName,
      storeAddress,
      telphone,
      email,
      tinNo,
      tax,
      currency,
      logo,
      allowPrinting,
    } = data;

    const [result] = await dbConnection.query(
      `UPDATE Maintenance
       SET storeName = ?, storeAddress = ?, telphone = ?, email = ?, tinNo = ?,
           tax = ?, currency = ?, logo = ?, allowPrinting = ?
       WHERE id = ?`,
      [
        storeName,
        storeAddress,
        telphone,
        email,
        tinNo,
        tax,
        currency,
        logo,
        allowPrinting,
        id,
      ]
    );
    return result.affectedRows > 0 ? this.findById(id) : null;
  }

  static async delete(id) {
    const [result] = await dbConnection.query(
      "DELETE FROM Maintenance WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  }
}
