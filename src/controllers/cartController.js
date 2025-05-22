import { Cart } from "../models/Cart.js";

export class CartController {
  static async createCart(req, res) {
    try {
      const newCart = await Cart.createCart(req.body);
      res.status(201).json({ cart: newCart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Creating cart entry failed" });
    }
  }

  static async getAllCarts(req, res) {
    try {
      const carts = await Cart.getAllCarts();
      res.json({ carts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching carts failed" });
    }
  }

  static async getCartById(req, res) {
    try {
      const { id } = req.params;
      const cart = await Cart.findById(id);
      if (!cart) return res.status(404).json({ error: "Cart not found" });
      res.json({ cart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching cart failed" });
    }
  }

  static async updateCart(req, res) {
    try {
      const { id } = req.params;
      const existingCart = await Cart.findById(id);
      if (!existingCart)
        return res.status(404).json({ error: "Cart not found" });

      const updatedCart = await Cart.updateCart(id, req.body);
      res.json({ message: "Cart updated successfully", cart: updatedCart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Updating cart failed" });
    }
  }

  static async deleteCart(req, res) {
    try {
      const { id } = req.params;
      const existingCart = await Cart.findById(id);
      if (!existingCart)
        return res.status(404).json({ error: "Cart not found" });

      const deleted = await Cart.deleteCart(id);
      res.json({
        message: deleted ? "Cart deleted successfully" : "Deletion failed",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Deleting cart failed" });
    }
  }
}
