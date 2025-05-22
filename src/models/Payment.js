import dbConnection from "../config/databaseConfig.js";

export class Payment {
  static async create(data) {
    const {
      invoice,
      vatSales,
      vatAmount,
      discount,
      total,
      cash,
      change,
      date,
      cashier,
      customerName,
      credit,
      gcash,
      bankTransfer,
      accountNo,
      accountName,
      refNo,
      paymentMethod,
      status,
    } = data;

    const [result] = await dbConnection.query(
      `INSERT INTO Payment 
       (invoice, vatSales, vatAmount, discount, total, cash, change, date, cashier, customerName,
        credit, gcash, bankTransfer, accountNo, accountName, refNo, paymentMethod, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        invoice,
        vatSales,
        vatAmount,
        discount,
        total,
        cash,
        change,
        date,
        cashier,
        customerName,
        credit,
        gcash,
        bankTransfer,
        accountNo,
        accountName,
        refNo,
        paymentMethod,
        status,
      ]
    );
    return this.findById(result.insertId);
  }

  static async findById(id) {
    const [result] = await dbConnection.query(
      "SELECT * FROM Payment WHERE id = ?",
      [id]
    );
    return result.length > 0 ? result[0] : null;
  }

  static async getAll() {
    const [result] = await dbConnection.query("SELECT * FROM Payment");
    return result;
  }

  static async update(id, data) {
    const {
      invoice,
      vatSales,
      vatAmount,
      discount,
      total,
      cash,
      change,
      date,
      cashier,
      customerName,
      credit,
      gcash,
      bankTransfer,
      accountNo,
      accountName,
      refNo,
      paymentMethod,
      status,
    } = data;

    const [result] = await dbConnection.query(
      `UPDATE Payment SET 
         invoice = ?, vatSales = ?, vatAmount = ?, discount = ?, total = ?, cash = ?, change = ?,
         date = ?, cashier = ?, customerName = ?, credit = ?, gcash = ?, bankTransfer = ?,
         accountNo = ?, accountName = ?, refNo = ?, paymentMethod = ?, status = ?
       WHERE id = ?`,
      [
        invoice,
        vatSales,
        vatAmount,
        discount,
        total,
        cash,
        change,
        date,
        cashier,
        customerName,
        credit,
        gcash,
        bankTransfer,
        accountNo,
        accountName,
        refNo,
        paymentMethod,
        status,
        id,
      ]
    );
    return result.affectedRows > 0 ? this.findById(id) : null;
  }

  static async delete(id) {
    const [result] = await dbConnection.query(
      "DELETE FROM Payment WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  }
}
