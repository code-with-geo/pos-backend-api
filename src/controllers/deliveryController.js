import { DeliveryModel } from "../models/Delivery.js";

export class DeliveryController {
  static async createDelivery(req, res) {
    try {
      const {
        formData,
        selectedProducts,
        transactionType,
        locationId,
        totalAmount,
      } = req.body;

      const deliveryId = await DeliveryModel.createDelivery({
        formData,
        selectedProducts,
        transactionType,
        locationId,
        totalAmount,
      });

      if (!formData || !selectedProducts.length) {
        return res.status(400).json({ error: "Invalid order data" });
      }

      res
        .status(201)
        .json({ message: "Order created successfully", deliveryId });
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
