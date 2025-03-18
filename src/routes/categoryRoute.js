import express from "express";
import { CategoryController } from "../controllers/categoryController.js";

const router = express.Router();

router.post("/create", CategoryController.createCategory);
router.get("/", CategoryController.getAllCategories);
router.get("/:id", CategoryController.getCategoryById);
router.put("/update/:id", CategoryController.updateCategory);
router.delete("/delete/:id", CategoryController.deleteCategory);

export { router as CategoryRoute };
