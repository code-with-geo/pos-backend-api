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

  static async completeDelivery(req, res) {
    try {
      const { deliveryId } = req.body;
      const result = await DeliveryModel.completeDelivery(deliveryId);

      if (!result.success) {
        res.status(400).json({ message: "Failed on completing delivery" });
      }

      res.status(201).json({ message: "Successful on completing delivery" });
    } catch (error) {
      console.error("Error completing order:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getAllPendingDeliveryByLocationId(req, res) {
    try {
      const { id } = req.params;
      const delivery = await DeliveryModel.getAllPendingDeliveryByLocationId(
        id
      );

      if (!delivery) {
        return res.status(404).json({ error: "No record found" });
      }

      res.json({ delivery });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching delivery failed" });
    }
  }
}
