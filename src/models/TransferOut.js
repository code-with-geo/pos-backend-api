import dbConnection from "../config/databaseConfig.js";

export class TransferOut {
  static async create(reference, pid, qty, transferTo, date, username) {
    const [result] = await dbConnection.query(
      `INSERT INTO TransferOut (reference, pid, qty, transferTo, date, username)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [reference, pid, qty, transferTo, date, username]
    );
    return this.findById(result.insertId);
  }

  static async findById(id) {
    const [result] = await dbConnection.query(
      "SELECT * FROM TransferOut WHERE id = ?",
      [id]
    );
    return result.length > 0 ? result[0] : null;
  }

  static async getAll() {
    const [result] = await dbConnection.query("SELECT * FROM TransferOut");
    return result;
  }

  static async update(id, reference, pid, qty, transferTo, date, username) {
    const [result] = await dbConnection.query(
      `UPDATE TransferOut 
       SET reference = ?, pid = ?, qty = ?, transferTo = ?, date = ?, username = ?
       WHERE id = ?`,
      [reference, pid, qty, transferTo, date, username, id]
    );
    return result.affectedRows > 0 ? this.findById(id) : null;
  }

  static async delete(id) {
    const [result] = await dbConnection.query(
      "DELETE FROM TransferOut WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  }
}
