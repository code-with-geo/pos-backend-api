import dbConnection from "../config/databaseConfig.js";

export class Day {
  static async createDay(data) {
    const {
      initialCash,
      openBy,
      timeOpen,
      closeBy,
      timeClosed,
      withdrawal,
      expense,
      status,
    } = data;

    const [result] = await dbConnection.query(
      `INSERT INTO Day 
      (initialCash, openBy, timeOpen, closeBy, timeClosed, withdrawal, expense, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        initialCash,
        openBy,
        timeOpen,
        closeBy,
        timeClosed,
        withdrawal,
        expense,
        status,
      ]
    );

    return this.findById(result.insertId);
  }

  static async findById(id) {
    const [result] = await dbConnection.query(
      "SELECT * FROM Day WHERE id = ?",
      [id]
    );
    return result.length > 0 ? result[0] : null;
  }

  static async getAllDays() {
    const [result] = await dbConnection.query("SELECT * FROM Day");
    return result;
  }

  static async updateDay(id, data) {
    const {
      initialCash,
      openBy,
      timeOpen,
      closeBy,
      timeClosed,
      withdrawal,
      expense,
      status,
    } = data;

    const [result] = await dbConnection.query(
      `UPDATE Day SET 
        initialCash = ?, openBy = ?, timeOpen = ?, closeBy = ?, 
        timeClosed = ?, withdrawal = ?, expense = ?, status = ?
      WHERE id = ?`,
      [
        initialCash,
        openBy,
        timeOpen,
        closeBy,
        timeClosed,
        withdrawal,
        expense,
        status,
        id,
      ]
    );

    return result.affectedRows > 0 ? this.findById(id) : null;
  }

  static async deleteDay(id) {
    const [result] = await dbConnection.query("DELETE FROM Day WHERE id = ?", [
      id,
    ]);
    return result.affectedRows > 0;
  }
}
