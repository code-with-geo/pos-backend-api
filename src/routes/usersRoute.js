import express from "express";
import { AuthMiddleware } from "../middelwares/authMiddleware.js";

const router = express.Router();

router.get("/", AuthMiddleware.verifyToken, (req, res) => {
  res.json({ message: "Protected route accessed!", user: req.user });
});

export { router as UsersRouter };
