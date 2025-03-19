import dbConnection from "../config/databaseConfig.js";

export class OrderProducts {
  // Add products to an order
  static async addOrderProduct(
    orderId,
    productId,
    quantity,
    discountId,
    subtotal
  ) {
    await dbConnection.query(
      `INSERT INTO OrderProducts (OrderId, ProductId, Quantity, DiscountId, Subtotal) 
         VALUES (?, ?, ?, ?, ?)`,
      [orderId, productId, quantity, discountId, subtotal]
    );
  }

  // Get ordered products by order ID
  static async findByOrderId(orderId) {
    const [result] = await dbConnection.query(
      "SELECT * FROM OrderProducts WHERE OrderId = ?",
      [orderId]
    );
    return result;
  }
}
