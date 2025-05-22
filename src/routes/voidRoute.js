import express from "express";
import { VoidController } from "../controllers/voidController.js";

const router = express.Router();

router.post("/create", VoidController.create);
router.get("/", VoidController.getAll);
router.get("/:id", VoidController.getById);
router.put("/update/:id", VoidController.update);
router.delete("/delete/:id", VoidController.delete);

export { router as VoidRouter };
