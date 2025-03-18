import express from "express";
import { CustomerController } from "../controllers/customersController.js";

const router = express.Router();

router.post("/create", CustomerController.createCustomer);
router.get("/", CustomerController.getAllCustomers);
router.get("/:id", CustomerController.getCustomerById);
router.put("/update/:id", CustomerController.updateCustomer);
router.delete("/delete/:id", CustomerController.deleteCustomer);

export { router as CustomersRouter };
