import express from "express";
import { LocationController } from "../controllers/locationsController.js";

const router = express.Router();

router.post("/create", LocationController.createLocation);
router.get("/", LocationController.getAllLocations);
router.get("/:id", LocationController.getLocationById);
router.put("/update/:id", LocationController.updateLocation);
router.delete("/delete/:id", LocationController.deleteLocation);

export { router as LocationsRoute };
