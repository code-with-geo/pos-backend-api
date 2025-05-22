import dbConnection from "../config/databaseConfig.js";

export class Cart {
  static async createCart(data) {
    const {
      transactionType,
      invoice,
      pid,
      vat,
      supplierPrice,
      markupPrice,
      qty,
      discountPercent,
      discount,
      vatSales,
      vatAmount,
      vatExempt,
      subTotal,
      date,
      cashier,
      status,
      bankSales,
      creditSales,
      gcashSales,
      cashSales,
    } = data;

    const [result] = await dbConnection.query(
      `INSERT INTO Cart (
        transactionType, invoice, pid, vat, supplierPrice, markupPrice, qty,
        discountPercent, discount, vatSales, vatAmount, vatExempt, subTotal,
        date, cashier, status, bankSales, creditSales, gcashSales, cashSales
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        transactionType,
        invoice,
        pid,
        vat,
        supplierPrice,
        markupPrice,
        qty,
        discountPercent,
        discount,
        vatSales,
        vatAmount,
        vatExempt,
        subTotal,
        date,
        cashier,
        status,
        bankSales,
        creditSales,
        gcashSales,
        cashSales,
      ]
    );
    return this.findById(result.insertId);
  }

  static async findById(id) {
    const [result] = await dbConnection.query(
      "SELECT * FROM Cart WHERE id = ?",
      [id]
    );
    return result.length > 0 ? result[0] : null;
  }

  static async getAllCarts() {
    const [result] = await dbConnection.query("SELECT * FROM Cart");
    return result;
  }

  static async updateCart(id, data) {
    const {
      transactionType,
      invoice,
      pid,
      vat,
      supplierPrice,
      markupPrice,
      qty,
      discountPercent,
      discount,
      vatSales,
      vatAmount,
      vatExempt,
      subTotal,
      date,
      cashier,
      status,
      bankSales,
      creditSales,
      gcashSales,
      cashSales,
    } = data;

    const [result] = await dbConnection.query(
      `UPDATE Cart SET
        transactionType = ?, invoice = ?, pid = ?, vat = ?, supplierPrice = ?, markupPrice = ?, qty = ?,
        discountPercent = ?, discount = ?, vatSales = ?, vatAmount = ?, vatExempt = ?, subTotal = ?,
        date = ?, cashier = ?, status = ?, bankSales = ?, creditSales = ?, gcashSales = ?, cashSales = ?
        WHERE id = ?`,
      [
        transactionType,
        invoice,
        pid,
        vat,
        supplierPrice,
        markupPrice,
        qty,
        discountPercent,
        discount,
        vatSales,
        vatAmount,
        vatExempt,
        subTotal,
        date,
        cashier,
        status,
        bankSales,
        creditSales,
        gcashSales,
        cashSales,
        id,
      ]
    );

    return result.affectedRows > 0 ? this.findById(id) : null;
  }

  static async deleteCart(id) {
    const [result] = await dbConnection.query("DELETE FROM Cart WHERE id = ?", [
      id,
    ]);
    return result.affectedRows > 0;
  }
}
