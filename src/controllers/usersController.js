import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "../models/Users.js";
import { AuthController } from "./authController.js";

dotenv.config();

export class UsersController {
  static async register(req, res) {
    try {
      const { name, username, password, isrole, status, locationId } = req.body;

      const existingUser = await User.findByUsername(username);
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      const newUser = await User.register(
        name,
        username,
        password,
        isrole,
        status,
        locationId
      );
      const token = AuthController.generateToken(newUser);

      res.status(201).json({ user: newUser, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Registration failed" });
    }
  }

  static async login(req, res) {
    try {
      const { username, password } = req.body;

      const user = await User.findByUsername(username);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = AuthController.generateToken(user);

      res.json({ message: "Login successful", user, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Login failed" });
    }
  }

  static async createUser(req, res) {
    try {
      const { name, username, password, isrole, status, locationId } = req.body;

      // Check if username already exists
      const existingUser = await User.findByUsername(username);
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      // Create new user
      const newUser = await User.createUser(
        name,
        username,
        password,
        isrole,
        status,
        locationId
      );
      const token = AuthController.generateToken(newUser);

      res.status(201).json({ user: newUser, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Creating user failed" });
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, username, password, isrole, status, locationId } = req.body;

      // Check if user exists
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Update user details
      const updatedUser = await User.updateUser(
        id,
        name,
        username,
        password,
        isrole,
        status,
        locationId
      );

      res.json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "User update failed" });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;

      // Check if user exists
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Delete user
      const deleted = await User.deleteUser(id);
      if (deleted) {
        res.json({ message: "User deleted successfully" });
      } else {
        res.status(500).json({ error: "Failed to delete user" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "User deletion failed" });
    }
  }
}
