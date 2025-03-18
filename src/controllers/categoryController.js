import { Category } from "../models/Category.js";

export class CategoryController {
  // Create a new category
  static async createCategory(req, res) {
    try {
      const { name, status } = req.body;

      // Create category
      const newCategory = await Category.createCategory(name, status);
      res.status(201).json({ category: newCategory });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Creating category failed" });
    }
  }

  // Get all categories
  static async getAllCategories(req, res) {
    try {
      const categories = await Category.getAllCategories();
      res.json({ categories });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching categories failed" });
    }
  }

  // Get a single category by ID
  static async getCategoryById(req, res) {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);

      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      res.json({ category });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching category failed" });
    }
  }

  // Update category details
  static async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { name, status } = req.body;

      // Check if category exists
      const category = await Category.findById(id);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      // Update category
      const updatedCategory = await Category.updateCategory(id, name, status);
      res.json({
        message: "Category updated successfully",
        category: updatedCategory,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Updating category failed" });
    }
  }

  // Delete a category
  static async deleteCategory(req, res) {
    try {
      const { id } = req.params;

      // Check if category exists
      const category = await Category.findById(id);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      // Delete category
      const deleted = await Category.deleteCategory(id);
      if (deleted) {
        res.json({ message: "Category deleted successfully" });
      } else {
        res.status(500).json({ error: "Failed to delete category" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Category deletion failed" });
    }
  }
}
