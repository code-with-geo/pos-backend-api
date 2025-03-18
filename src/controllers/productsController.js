import { Products } from "../models/Products.js";

export class ProductController {
  // Create a new product
  static async createProduct(req, res) {
    try {
      const {
        barcode,
        name,
        description,
        supplierPrice,
        retailPrice,
        wholesalePrice,
        reorderLevel,
        remarks,
        isVat,
        status,
        categoryId,
      } = req.body;

      const newProduct = await Products.createProduct(
        barcode,
        name,
        description,
        supplierPrice,
        retailPrice,
        wholesalePrice,
        reorderLevel,
        remarks,
        isVat,
        status,
        categoryId
      );

      res.status(201).json({ product: newProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Creating product failed" });
    }
  }

  // Get all products
  static async getAllProducts(req, res) {
    try {
      const products = await Products.getAllProducts();
      res.json({ products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching products failed" });
    }
  }

  // Get a single product by ID
  static async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await Products.findById(id);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json({ product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching product failed" });
    }
  }

  // Update product details
  static async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const {
        barcode,
        name,
        description,
        supplierPrice,
        retailPrice,
        wholesalePrice,
        reorderLevel,
        remarks,
        isVat,
        status,
        categoryId,
      } = req.body;

      const product = await Products.findById(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const updatedProduct = await Products.updateProduct(
        id,
        barcode,
        name,
        description,
        supplierPrice,
        retailPrice,
        wholesalePrice,
        reorderLevel,
        remarks,
        isVat,
        status,
        categoryId
      );

      res.json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Updating product failed" });
    }
  }

  // Delete a product
  static async deleteProduct(req, res) {
    try {
      const { id } = req.params;

      const product = await Products.findById(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const deleted = await Products.deleteProduct(id);
      if (deleted) {
        res.json({ message: "Product deleted successfully" });
      } else {
        res.status(500).json({ error: "Failed to delete product" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Product deletion failed" });
    }
  }
}
