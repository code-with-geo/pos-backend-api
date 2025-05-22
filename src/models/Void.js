import dbConnection from "../config/databaseConfig.js";

export class Void {
  static async create(
    invoice,
    pid,
    markupPrice,
    qty,
    discount,
    total,
    action,
    reason,
    date,
    cashier
  ) {
    const [result] = await dbConnection.query(
      `INSERT INTO Void 
       (invoice, pid, markupPrice, qty, discount, total, action, reason, date, cashier)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        invoice,
        pid,
        markupPrice,
        qty,
        discount,
        total,
        action,
        reason,
        date,
        cashier,
      ]
    );
    return this.findById(result.insertId);
  }

  static async findById(id) {
    const [result] = await dbConnection.query(
      "SELECT * FROM Void WHERE id = ?",
      [id]
    );
    return result.length > 0 ? result[0] : null;
  }

  static async getAll() {
    const [result] = await dbConnection.query("SELECT * FROM Void");
    return result;
  }

  static async update(
    id,
    invoice,
    pid,
    markupPrice,
    qty,
    discount,
    total,
    action,
    reason,
    date,
    cashier
  ) {
    const [result] = await dbConnection.query(
      `UPDATE Void 
       SET invoice = ?, pid = ?, markupPrice = ?, qty = ?, discount = ?, total = ?, action = ?, reason = ?, date = ?, cashier = ?
       WHERE id = ?`,
      [
        invoice,
        pid,
        markupPrice,
        qty,
        discount,
        total,
        action,
        reason,
        date,
        cashier,
        id,
      ]
    );
    return result.affectedRows > 0 ? this.findById(id) : null;
  }

  static async delete(id) {
    const [result] = await dbConnection.query("DELETE FROM Void WHERE id = ?", [
      id,
    ]);
    return result.affectedRows > 0;
  }
}
