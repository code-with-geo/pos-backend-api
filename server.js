import express from "express";
import dotenv from "dotenv";
import { AuthRouter } from "./src/routes/authRoute.js";
import { UsersRouter } from "./src/routes/usersRoute.js";
import { SuppliersRoute } from "./src/routes/suppliersRoute.js";
import { LocationsRoute } from "./src/routes/locationsRoute.js";
import { CategoryRoute } from "./src/routes/categoryRoute.js";
import { ProductsRoute } from "./src/routes/productsRoute.js";

dotenv.config();

const app = express();
app.use(express.json());

// Authentication routes
app.use("/api/auth", AuthRouter);
// Users routes
app.use("/api/users", UsersRouter);
// Suppliers routes
app.use("/api/suppliers", SuppliersRoute);
// Locations routes
app.use("/api/locations", LocationsRoute);
// Category routes
app.use("/api/category", CategoryRoute);
// Products routes
app.use("/api/products", ProductsRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
