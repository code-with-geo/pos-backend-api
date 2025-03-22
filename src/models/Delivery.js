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

    // Get the current date in MMDDYYYY format
    const now = new Date();
    const dateString = `${(now.getMonth() + 1).toString().padStart(2, "0")}${now
      .getDate()
      .toString()
      .padStart(2, "0")}${now.getFullYear()}`;

    // Count deliveries made today
    const [countResult] = await dbConnection.query(
      `SELECT COUNT(*) AS count FROM Delivery WHERE ReferenceNo LIKE ?`,
      [`${dateString}-%`]
    );

    const deliveryCount = countResult[0].count + 1; // Increment count for new delivery
    const referenceNo = `${dateString}-${deliveryCount
      .toString()
      .padStart(4, "0")}`;

    // Insert into Delivery table
    const [deliveryResult] = await dbConnection.query(
      `INSERT INTO Delivery (ReferenceNo, Name, Address, Note, Agent, Term, ShipTo, TransactionType, TotalAmount, Status, LocationId) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        referenceNo, // Include the generated reference number
        formData.name,
        formData.address,
        formData.note,
        formData.agent,
        formData.term,
        formData.shipTo,
        transactionType,
        totalAmount,
        0,
        locationId,
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

      // Insert into DeliveryProducts table
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
    });

    await Promise.all(deliveryDetailsPromises);
    return deliveryId;
  }

  static async completeDelivery(deliveryId) {
    try {
      const [products] = await dbConnection.query(
        `SELECT DP.ProductId, DP.Quantity, D.LocationId
       FROM DeliveryProducts DP
       JOIN Delivery D ON DP.DeliveryId = D.DeliveryId
       WHERE DP.DeliveryId = ?`,
        [deliveryId]
      );

      if (products.length === 0) {
        throw new Error("No products found for this delivery.");
      }

      // Update inventory for each product
      for (const product of products) {
        const { ProductId, Quantity, LocationId } = product;

        const [result] = await dbConnection.query(
          `UPDATE Inventory 
         SET Units = Units - ? 
         WHERE ProductId = ? AND LocationId = ? AND Units >= ?`,
          [Quantity, ProductId, LocationId, Quantity]
        );

        if (result.affectedRows === 0) {
          throw new Error(
            `Not enough stock for Product ID ${ProductId} at Location ID ${LocationId}`
          );
        }
      }

      // Mark delivery as completed
      await dbConnection.query(
        `UPDATE Delivery SET Status = 1 WHERE DeliveryId = ?`,
        [deliveryId]
      );

      return { success: true, message: "Delivery completed successfully." };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  static async getAllPendingDeliveryByLocationId(locationId) {
    const [products] = await dbConnection.query(
      `SELECT ReferenceNo, Name, ShipTo, TotalAmount, DateCreated FROM
      Delivery WHERE LocationId = ? AND Status = 0`,
      [locationId]
    );

    return products.length > 0 ? products : null;
  }
}
