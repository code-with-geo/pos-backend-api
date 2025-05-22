import dbConnection from "../config/databaseConfig.js";

export class StockIn {
  static async create(data) {
    const {
      reference,
      sid,
      pid,
      qty,
      date,
      username,
      status,
      flag,
      xdate,
      xlot,
    } = data;
    const [result] = await dbConnection.query(
      `INSERT INTO StockIn (reference, sid, pid, qty, date, username, status, flag, xdate, xlot) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [reference, sid, pid, qty, date, username, status, flag, xdate, xlot]
    );
    return this.findById(result.insertId);
  }

  static async findById(id) {
    const [result] = await dbConnection.query(
      "SELECT * FROM StockIn WHERE id = ?",
      [id]
    );
    return result.length > 0 ? result[0] : null;
  }

  static async getAll() {
    const [result] = await dbConnection.query("SELECT * FROM StockIn");
    return result;
  }

  static async update(id, data) {
    const {
      reference,
      sid,
      pid,
      qty,
      date,
      username,
      status,
      flag,
      xdate,
      xlot,
    } = data;
    const [result] = await dbConnection.query(
      `UPDATE StockIn SET reference = ?, sid = ?, pid = ?, qty = ?, date = ?, username = ?, status = ?, flag = ?, xdate = ?, xlot = ? WHERE id = ?`,
      [reference, sid, pid, qty, date, username, status, flag, xdate, xlot, id]
    );
    return result.affectedRows > 0 ? this.findById(id) : null;
  }

  static async delete(id) {
    const [result] = await dbConnection.query(
      "DELETE FROM StockIn WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  }
}
