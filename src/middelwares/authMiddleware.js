import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class AuthMiddleware {
  static verifyToken(req, res, next) {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) return res.status(401).json({ error: "No token provided" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ error: "Invalid token" });
    }
  }
}
