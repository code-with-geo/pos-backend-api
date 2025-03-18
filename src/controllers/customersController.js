import { Customers } from "../models/Customers.js";

export class CustomerController {
  // Create a new customer
  static async createCustomer(req, res) {
    try {
      const {
        firstName,
        lastName,
        contactNo,
        email,
        cardNumber,
        points,
        status,
      } = req.body;

      const newCustomer = await Customers.createCustomer(
        firstName,
        lastName,
        contactNo,
        email,
        cardNumber,
        points,
        status
      );
      res.status(201).json({ customer: newCustomer });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Creating customer failed" });
    }
  }

  // Get all customers
  static async getAllCustomers(req, res) {
    try {
      const customers = await Customers.getAllCustomers();
      res.json({ customers });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching customers failed" });
    }
  }

  // Get a single customer by ID
  static async getCustomerById(req, res) {
    try {
      const { id } = req.params;
      const customer = await Customers.findById(id);

      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }

      res.json({ customer });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fetching customer failed" });
    }
  }

  // Update customer details
  static async updateCustomer(req, res) {
    try {
      const { id } = req.params;
      const {
        firstName,
        lastName,
        contactNo,
        email,
        cardNumber,
        points,
        status,
      } = req.body;

      const customer = await Customers.findById(id);
      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }

      const updatedCustomer = await Customers.updateCustomer(
        id,
        firstName,
        lastName,
        contactNo,
        email,
        cardNumber,
        points,
        status
      );
      res.json({
        message: "Customer updated successfully",
        customer: updatedCustomer,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Updating customer failed" });
    }
  }

  // Delete a customer
  static async deleteCustomer(req, res) {
    try {
      const { id } = req.params;

      const customer = await Customers.findById(id);
      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }

      const deleted = await Customers.deleteCustomer(id);
      if (deleted) {
        res.json({ message: "Customer deleted successfully" });
      } else {
        res.status(500).json({ error: "Failed to delete customer" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Customer deletion failed" });
    }
  }
}
