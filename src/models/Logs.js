import dbConnection from "../config/databaseConfig.js";

export class Logs {
  static async createLog({ username, workStation, date, timeIn, timeOut }) {
    const [result] = await dbConnection.query(
      `INSERT INTO Logs (username, workStation, date, timeIn, timeOut)
       VALUES (?, ?, ?, ?, ?)`,
      [username, workStation, date, timeIn, timeOut]
    );
    return this.findById(result.insertId);
  }

  static async findById(id) {
    const [result] = await dbConnection.query(
      "SELECT * FROM Logs WHERE id = ?",
      [id]
    );
    return result.length > 0 ? result[0] : null;
  }

  static async getAllLogs() {
    const [result] = await dbConnection.query(
      "SELECT * FROM Logs ORDER BY date DESC, timeIn DESC"
    );
    return result;
  }

  static async updateLog(id, { username, workStation, date, timeIn, timeOut }) {
    const [result] = await dbConnection.query(
      `UPDATE Logs
       SET username = ?, workStation = ?, date = ?, timeIn = ?, timeOut = ?
       WHERE id = ?`,
      [username, workStation, date, timeIn, timeOut, id]
    );
    return result.affectedRows > 0 ? this.findById(id) : null;
  }

  static async deleteLog(id) {
    const [result] = await dbConnection.query("DELETE FROM Logs WHERE id = ?", [
      id,
    ]);
    return result.affectedRows > 0;
  }
}
