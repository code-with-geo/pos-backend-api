import dbConnection from "../config/databaseConfig.js";

export class StockAdjustment {
  static async create(data) {
    const { pid, qty, action, reason, date, username } = data;
    const [result] = await dbConnection.query(
      `INSERT INTO StockAdjustment (pid, qty, action, reason, date, username) VALUES (?, ?, ?, ?, ?, ?)`,
      [pid, qty, action, reason, date, username]
    );
    return this.findById(result.insertId);
  }

  static async findById(id) {
    const [result] = await dbConnection.query(
      "SELECT * FROM StockAdjustment WHERE id = ?",
      [id]
    );
    return result.length > 0 ? result[0] : null;
  }

  static async getAll() {
    const [result] = await dbConnection.query("SELECT * FROM StockAdjustment");
    return result;
  }

  static async update(id, data) {
    const { pid, qty, action, reason, date, username } = data;
    const [result] = await dbConnection.query(
      `UPDATE StockAdjustment SET pid = ?, qty = ?, action = ?, reason = ?, date = ?, username = ? WHERE id = ?`,
      [pid, qty, action, reason, date, username, id]
    );
    return result.affectedRows > 0 ? this.findById(id) : null;
  }

  static async delete(id) {
    const [result] = await dbConnection.query(
      "DELETE FROM StockAdjustment WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  }
}
