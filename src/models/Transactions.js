import dbConnection from "../config/databaseConfig.js";

export class Transactions {
  static async create(invoice) {
    const [result] = await dbConnection.query(
      `INSERT INTO Transactions (invoice) VALUES (?)`,
      [invoice]
    );
    return this.findById(result.insertId);
  }

  static async findById(id) {
    const [result] = await dbConnection.query(
      "SELECT * FROM Transactions WHERE id = ?",
      [id]
    );
    return result.length > 0 ? result[0] : null;
  }

  static async getAll() {
    const [result] = await dbConnection.query("SELECT * FROM Transactions");
    return result;
  }

  static async update(id, invoice) {
    const [result] = await dbConnection.query(
      `UPDATE Transactions SET invoice = ? WHERE id = ?`,
      [invoice, id]
    );
    return result.affectedRows > 0 ? this.findById(id) : null;
  }

  static async delete(id) {
    const [result] = await dbConnection.query(
      "DELETE FROM Transactions WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  }
}
