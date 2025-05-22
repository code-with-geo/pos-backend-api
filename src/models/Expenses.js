import dbConnection from "../config/databaseConfig.js";

export class Expenses {
  static async createExpense(data) {
    const { description, amount, remarks, date, addedBy } = data;

    const [result] = await dbConnection.query(
      `INSERT INTO Expenses (description, amount, remarks, date, addedBy)
       VALUES (?, ?, ?, ?, ?)`,
      [description, amount, remarks, date, addedBy]
    );

    return this.findById(result.insertId);
  }

  static async findById(id) {
    const [result] = await dbConnection.query(
      "SELECT * FROM Expenses WHERE id = ?",
      [id]
    );
    return result.length > 0 ? result[0] : null;
  }

  static async getAllExpenses() {
    const [result] = await dbConnection.query(
      "SELECT * FROM Expenses ORDER BY date DESC"
    );
    return result;
  }

  static async updateExpense(id, data) {
    const { description, amount, remarks, date, addedBy } = data;

    const [result] = await dbConnection.query(
      `UPDATE Expenses
       SET description = ?, amount = ?, remarks = ?, date = ?, addedBy = ?
       WHERE id = ?`,
      [description, amount, remarks, date, addedBy, id]
    );

    return result.affectedRows > 0 ? this.findById(id) : null;
  }

  static async deleteExpense(id) {
    const [result] = await dbConnection.query(
      "DELETE FROM Expenses WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  }
}
