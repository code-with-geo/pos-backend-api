import dbConnection from "../config/databaseConfig.js";

export class TransferIn {
  static async create(reference, pid, qty, transferFrom, date, username) {
    const [result] = await dbConnection.query(
      `INSERT INTO TransferIn (reference, pid, qty, transferFrom, date, username)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [reference, pid, qty, transferFrom, date, username]
    );
    return this.findById(result.insertId);
  }

  static async findById(id) {
    const [result] = await dbConnection.query(
      "SELECT * FROM TransferIn WHERE id = ?",
      [id]
    );
    return result.length > 0 ? result[0] : null;
  }

  static async getAll() {
    const [result] = await dbConnection.query("SELECT * FROM TransferIn");
    return result;
  }

  static async update(id, reference, pid, qty, transferFrom, date, username) {
    const [result] = await dbConnection.query(
      `UPDATE TransferIn 
       SET reference = ?, pid = ?, qty = ?, transferFrom = ?, date = ?, username = ?
       WHERE id = ?`,
      [reference, pid, qty, transferFrom, date, username, id]
    );
    return result.affectedRows > 0 ? this.findById(id) : null;
  }

  static async delete(id) {
    const [result] = await dbConnection.query(
      "DELETE FROM TransferIn WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  }
}
