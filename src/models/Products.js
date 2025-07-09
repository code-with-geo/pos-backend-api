import dbConnection from "../config/databaseConfig.js";

export class Products {
  static async create(data) {
    const {
      barcode,
      description,
      unit,
      initialQty,
      qty,
      supplierPrice,
      retailPrice,
      wholesalePrice,
      reorder,
      vat,
      remarks,
    } = data;
    const [result] = await dbConnection.query(
      `INSERT INTO Products 
      (barcode, description, unit, initialQty, qty, supplierPrice, retailPrice, wholesalePrice, reorder, vat, remarks)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        barcode,
        description,
        unit,
        initialQty,
        qty,
        supplierPrice,
        retailPrice,
        wholesalePrice,
        reorder,
        vat,
        remarks,
      ]
    );
    return this.findById(result.insertId);
  }

  static async findById(id) {
    const [result] = await dbConnection.query(
      "SELECT * FROM Products WHERE id = ?",
      [id]
    );
    return result.length > 0 ? result[0] : null;
  }

  static async getAll() {
    const [result] = await dbConnection.query("SELECT * FROM Products");
    return result;
  }

  static async update(id, data) {
    const {
      barcode,
      description,
      unit,
      initialQty,
      qty,
      supplierPrice,
      retailPrice,
      wholesalePrice,
      reorder,
      vat,
      remarks,
    } = data;
    const [result] = await dbConnection.query(
      `UPDATE Products SET
        barcode = ?, description = ?, unit = ?, initialQty = ?, qty = ?, 
        supplierPrice = ?, retailPrice = ?, wholesalePrice = ?, reorder = ?, vat = ?, remarks = ?
       WHERE id = ?`,
      [
        barcode,
        description,
        unit,
        initialQty,
        qty,
        supplierPrice,
        retailPrice,
        wholesalePrice,
        reorder,
        vat,
        remarks,
        id,
      ]
    );
    return result.affectedRows > 0 ? this.findById(id) : null;
  }

  static async delete(id) {
    const [result] = await dbConnection.query(
      "DELETE FROM Products WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  }

  static async createStockMonitorView() {
    const query = `
    CREATE OR REPLACE VIEW vw_stockMonitor AS
    SELECT
      p.id,
      p.barcode,
      p.description,
      p.unit,
      p.qty + IFNULL(SUM(c.qty), 0) AS startInventory,
      IFNULL(SUM(c.qty), 0) AS qtySold,
      p.qty AS available
    FROM Products AS p
    INNER JOIN Cart AS c ON p.id = c.pid
    WHERE c.status = 'Completed'
      AND DATE(c.date) = CURDATE()
    GROUP BY
      p.id,
      p.barcode,
      p.description,
      p.unit,
      p.qty
  `;

    try {
      await dbConnection.query(query);
      console.log("View 'vw_stockMonitor' created successfully.");
    } catch (error) {
      console.error("Failed to create vw_stockMonitor:", error.message);
      throw error;
    }
  }
}
