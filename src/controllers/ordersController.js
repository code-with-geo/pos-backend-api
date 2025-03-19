import { Orders } from "../models/Orders.js";
import { OrderProducts } from "../models/OrderProducts.js";

export class OrderController {
  // Create a new order
  static async createOrder(req, res) {
    try {
      const {
        status,
        totalAmount,
        totalDiscount,
        totalVatSale,
        totalVatAmount,
        totalVatExempt,
        transactionType,
        paymentType,
        userId,
        locationId,
        customerId,
        accountName,
        accountNumber,
        digitalPaymentAmount,
        invoiceNo,
        referenceNo,
        products, // Array of ordered products [{ productId, quantity, discountId, subtotal }]
      } = req.body;

      // Create the order
      const newOrder = await Orders.createOrder(
        status,
        totalAmount,
        totalDiscount,
        totalVatSale,
        totalVatAmount,
        totalVatExempt,
        transactionType,
        paymentType,
        userId,
        locationId,
        customerId,
        accountName,
        accountNumber,
        digitalPaymentAmount,
        invoiceNo,
        referenceNo
      );

      // Add products to the order
      for (const product of products) {
        await OrderProducts.addOrderProduct(
          newOrder.OrderId,
          product.productId,
          product.quantity,
          product.discountId,
          product.subtotal
        );
      }

      res
        .status(201)
        .json({ message: "Order created successfully", order: newOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Order creation failed" });
    }
  }

  // Get order details with products
  static async getOrderById(req, res) {
    try {
      const { id } = req.params;
      const order = await Orders.findById(id);

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      const orderProducts = await OrderProducts.findByOrderId(id);

      res.json({ order, products: orderProducts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching order failed" });
    }
  }
}
