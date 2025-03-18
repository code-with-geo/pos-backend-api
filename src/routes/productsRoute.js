import express from "express";
import { ProductController } from "../controllers/productsController.js";

const router = express.Router();

router.post("/create", ProductController.createProduct);
router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.put("/update/:id", ProductController.updateProduct);
router.delete("/delete/:id", ProductController.deleteProduct);

export { router as ProductsRoute };
