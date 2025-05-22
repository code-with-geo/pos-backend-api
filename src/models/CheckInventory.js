import dbConnection from "../config/databaseConfig.js";

export class CheckInventory {
  static async createCheck(data) {
    const {
      reference,
      pid,
      systemInventory,
      actualInventory,
      date,
      username,
      status,
    } = data;

    const [result] = await dbConnection.query(
      `INSERT INTO CheckInventory 
      (reference, pid, systemInventory, actualInventory, date, username, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [reference, pid, systemInventory, actualInventory, date, username, status]
    );

    return this.findById(result.insertId);
  }

  static async findById(id) {
    const [result] = await dbConnection.query(
      "SELECT * FROM CheckInventory WHERE id = ?",
      [id]
    );
    return result.length > 0 ? result[0] : null;
  }

  static async getAllChecks() {
    const [result] = await dbConnection.query("SELECT * FROM CheckInventory");
    return result;
  }

  static async updateCheck(id, data) {
    const {
      reference,
      pid,
      systemInventory,
      actualInventory,
      date,
      username,
      status,
    } = data;

    const [result] = await dbConnection.query(
      `UPDATE CheckInventory SET 
        reference = ?, pid = ?, systemInventory = ?, actualInventory = ?, 
        date = ?, username = ?, status = ?
      WHERE id = ?`,
      [
        reference,
        pid,
        systemInventory,
        actualInventory,
        date,
        username,
        status,
        id,
      ]
    );

    return result.affectedRows > 0 ? this.findById(id) : null;
  }

  static async deleteCheck(id) {
    const [result] = await dbConnection.query(
      "DELETE FROM CheckInventory WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  }
}
