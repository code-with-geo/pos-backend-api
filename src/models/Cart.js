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

  static async createCartView() {
    const createViewQuery = `
    CREATE OR REPLACE VIEW vw_cart AS
    SELECT
        Cart.id,
        Cart.transactionType,
        Cart.invoice,
        Cart.pid,
        Products.barcode,
        Products.description,
        Products.unit,
        Cart.supplierPrice,
        Cart.markupPrice,
        Cart.qty,
        CAST(Cart.markupPrice * Cart.qty AS DECIMAL(18, 2)) AS amount,
        Cart.discountPercent,
        Cart.discount,
        Cart.vatSales,
        Cart.vatAmount,
        Cart.vatExempt,
        Cart.subTotal,
        CAST(Cart.subTotal - Cart.supplierPrice * Cart.qty AS DECIMAL(18, 2)) AS profit,
        Cart.date,
        Cart.cashier,
        Cart.vat,
        Cart.status,
        Payment.paymentMethod,
        Payment.date AS pdate
    FROM
        Products
    INNER JOIN Cart ON Products.id = Cart.pid
    LEFT JOIN Payment ON Cart.invoice = Payment.invoice
  `;

    try {
      await dbConnection.query(createViewQuery);
      console.log("View 'vw_cart' created or replaced successfully.");
    } catch (error) {
      console.error("Failed to create view 'vw_cart':", error.message);
      throw error;
    }
  }

  static async createSummaryView() {
    const query = `
    CREATE OR REPLACE VIEW vw_SalesSummary AS
    SELECT
      CAST(d.timeOpen AS DATE) AS date,
      COUNT(DISTINCT c.invoice) AS totalInvoice,
      IFNULL(SUM(c.qty), 0) AS totalQty,
      IFNULL(SUM(c.subTotal + c.discount), 0.00) AS amount,
      IFNULL(SUM(c.subTotal), 0.00) AS totalSales,
      IFNULL(SUM(c.subTotal), 0.00) - IFNULL(SUM(c.supplierPrice * c.qty), 0.00) AS profit,
      IFNULL(SUM(c.discount), 0.00) AS totalDiscount,
      IFNULL(SUM(c.vatSales), 0.00) AS vatSales,
      IFNULL(SUM(c.vatAmount), 0.00) AS vatAmount,
      IFNULL(SUM(c.vatExempt), 0.00) AS vatExempt,
      d.initialCash,
      d.expense,
      d.withdrawal,
      d.openBy,
      d.timeOpen,
      d.closeBy,
      d.timeClosed
    FROM Day AS d
    LEFT OUTER JOIN Cart AS c
      ON DATE(c.date) = DATE(d.timeOpen)
    WHERE c.status IS NULL OR c.status = 'Completed'
    GROUP BY
      DATE(d.timeOpen),
      d.openBy,
      d.timeOpen,
      d.initialCash,
      d.expense,
      d.withdrawal,
      d.closeBy,
      d.timeClosed
  `;

    try {
      await dbConnection.query(query);
      console.log("View 'cart_summary_view' created or replaced successfully.");
    } catch (error) {
      console.error("Failed to create cart summary view:", error.message);
      throw error;
    }
  }
}
