import express from "express";
import { AuthMiddleware } from "../middelwares/authMiddleware.js";
import { UsersController } from "../controllers/usersController.js";

const router = express.Router();

router.post("/create", AuthMiddleware.verifyToken, UsersController.createUser);
router.put(
  "/update/:id",
  AuthMiddleware.verifyToken,
  UsersController.updateUser
);
router.delete(
  "/delete/:id",
  AuthMiddleware.verifyToken,
  UsersController.deleteUser
);
export { router as UsersRouter };
