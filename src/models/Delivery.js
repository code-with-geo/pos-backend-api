import dbConnection from "../config/databaseConfig.js";

export class DeliveryModel {
  static async createDelivery(deliveryData) {
    const {
      formData,
      selectedProducts,
      transactionType,
      locationId,
      totalAmount,
    } = deliveryData;

    const [deliveryResult] = await dbConnection.query(
      `INSERT INTO Delivery (Name, Address, Note, Agent, Term, ShipTo, TransactionType, TotalAmount, Status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        formData.name,
        formData.address,
        formData.note,
        formData.agent,
        formData.term,
        formData.shipTo,
        transactionType,
        totalAmount,
        0,
      ]
    );

    const deliveryId = deliveryResult.insertId;

    // Process each product
    const deliveryDetailsPromises = selectedProducts.map(async (product) => {
      const price =
        transactionType === "Retail"
          ? product.RetailPrice
          : product.WholesalePrice;

      const discountedPrice = product.discountId
        ? price * (1 - product.discountPercentage / 100)
        : price;

      const subtotal = product.units * discountedPrice;

      // Insert into OrderDetails table
      await dbConnection.query(
        `INSERT INTO DeliveryProducts (DeliveryId, ProductId, Quantity, Price, Subtotal, DiscountId) 
           VALUES (?, ?, ?, ?, ?, ?)`,
        [
          deliveryId,
          product.Id,
          product.units,
          discountedPrice,
          subtotal,
          product.discounts?.DiscountId || 0,
        ]
      );

      // **Update Inventory**
      await dbConnection.query(
        `UPDATE Inventory 
           SET Units = Units - ? 
           WHERE ProductId = ? AND LocationId = ? AND Units >= ?`,
        [product.units, product.Id, locationId, product.units]
      );
    });

    await Promise.all(deliveryDetailsPromises);
    return deliveryId;
  }
}
