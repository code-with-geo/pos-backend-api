import express from "express";
import { CheckInventoryController } from "../controllers/checkInventoryController.js";
import { AuthMiddleware } from "../middelwares/authMiddleware.js";

const router = express.Router();

router.post(
  "/create",
  AuthMiddleware.verifyToken,
  CheckInventoryController.createCheck
);
router.get(
  "/",
  AuthMiddleware.verifyToken,
  CheckInventoryController.getAllChecks
);
router.get(
  "/:id",
  AuthMiddleware.verifyToken,
  CheckInventoryController.getCheckById
);
router.put(
  "/update/:id",
  AuthMiddleware.verifyToken,
  CheckInventoryController.updateCheck
);
router.delete(
  "/delete/:id",
  AuthMiddleware.verifyToken,
  CheckInventoryController.deleteCheck
);

export { router as CheckInventoryRouter };
