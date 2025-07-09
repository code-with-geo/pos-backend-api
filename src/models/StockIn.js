import dbConnection from "../config/databaseConfig.js";
import { format } from "date-fns"; // optional for formatting

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

  static async getExpiryAlert(what = "alert", baseDays = 180) {
    const today = new Date();
    const formattedToday = format(today, "yyyy-MM-dd"); // MySQL format

    const nearStartDate = format(
      new Date(today.getTime() + 24 * 60 * 60 * 1000),
      "yyyy-MM-dd"
    );
    const nearEndDate = format(
      new Date(today.getTime() + baseDays * 24 * 60 * 60 * 1000),
      "yyyy-MM-dd"
    );

    let query = `
      SELECT 
        s.id AS xid,
        p.id AS xcode,
        p.description AS xitem,
        sup.supplierName AS xsup,
        s.date AS xrrdate,
        s.qty AS xrrqty,
        s.xdate AS xdate,
        s.xlot AS xdatelot,
        DATEDIFF(DATE(s.xdate), ?) AS xdays,
        CASE 
          WHEN DATE(s.xdate) <= ? THEN 'EXPIRED'
          WHEN DATE(s.xdate) BETWEEN ? AND ? THEN 'NEAR XDATE'
          ELSE ''
        END AS xstatus
      FROM StockIn s
      JOIN Products p ON s.pid = p.id
      LEFT JOIN Supplier sup ON s.sid = sup.id
      WHERE IFNULL(s.flag, 0) = 0
        AND s.status = 'Completed'
        AND STR_TO_DATE(s.xdate, '%Y-%m-%d') IS NOT NULL
    `;

    // Conditions based on `what`
    if (what === "expired") {
      query += ` AND DATE(s.xdate) <= ? ORDER BY xdays`;
    } else if (what === "near") {
      query += ` AND DATE(s.xdate) BETWEEN ? AND ? ORDER BY xdays`;
    } else if (what === "alert") {
      query += ` AND (
        DATE(s.xdate) <= ?
        OR (DATE(s.xdate) BETWEEN ? AND ?)
      )`;
    }

    let params = [];

    if (what === "expired") {
      params = [formattedToday, formattedToday];
    } else if (what === "near") {
      params = [formattedToday, nearStartDate, nearEndDate];
    } else {
      params = [formattedToday, formattedToday, nearStartDate, nearEndDate];
    }

    const [result] = await dbConnection.query(query, params);
    return result;
  }

  static async createStockInView() {
    const query = `
    CREATE OR REPLACE VIEW vw_stockIn AS
    SELECT
      s.reference,
      c.supplierName,
      s.sid,
      s.pid,
      p.description,
      s.qty,
      p.qty AS current_stocks,
      p.supplierPrice,
      p.retailPrice,
      p.wholesalePrice,
      s.status,
      s.date,
      s.username,
      s.xdate,
      s.xlot
    FROM Products AS p
    INNER JOIN StockIn AS s ON p.id = s.pid
    INNER JOIN Supplier AS c ON s.sid = c.id
  `;

    try {
      await dbConnection.query(query);
      console.log("View 'vw_stockIn' created or replaced successfully.");
    } catch (error) {
      console.error("Failed to create view 'vw_stockIn':", error.message);
      throw error;
    }
  }
}
