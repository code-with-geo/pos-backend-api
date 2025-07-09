import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "../models/Users.js";

dotenv.config();

export class AuthController {
  static generateToken(user) {
    return jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1h",
      }
    );
  }

  static async register(req, res) {
    try {
      const { name, username, password, isrole, status, locationId } = req.body;

      const existingUser = await User.findByUsername(username);
      if (existingUser)
        return res.status(400).json({ error: "Username already exists" });

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
      res.status(500).json({ error: "Registration failed" });
    }
  }

  static async login(req, res) {
    try {
      const { username, password } = req.body;

      const user = await User.findByUsername(username);
      if (!user) return res.status(401).json({ error: "Invalid credentials" });
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(isMatch);
      if (!isMatch)
        return res.status(401).json({ error: "Invalid credentials" });

      const token = AuthController.generateToken(user);
      res.json({ user, token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Login failed" });
    }
  }
}
