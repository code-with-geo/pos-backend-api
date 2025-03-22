import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AuthRouter } from "./src/routes/authRoute.js";
import { UsersRouter } from "./src/routes/usersRoute.js";
import { SuppliersRoute } from "./src/routes/suppliersRoute.js";
import { LocationsRoute } from "./src/routes/locationsRoute.js";
import { CategoryRoute } from "./src/routes/categoryRoute.js";
import { ProductsRoute } from "./src/routes/productsRoute.js";
import { DiscountsRouter } from "./src/routes/discountsRoute.js";
import { InventoryRouter } from "./src/routes/inventoryRoute.js";
import { CustomersRouter } from "./src/routes/customersRoute.js";
import { OrdersRouter } from "./src/routes/ordersRoute.js";
import { DeliveryRouter } from "./src/routes/deliveryRoute.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

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
// Discounts routes
app.use("/api/discounts", DiscountsRouter);
// Invetory routes
app.use("/api/inventory", InventoryRouter);
// Customer routes
app.use("/api/customers", CustomersRouter);
// Orders routes
app.use("/api/orders", OrdersRouter);
// Delivery routes
app.use("/api/delivery", DeliveryRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
