import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

// Import all routes
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
import { CartRouter } from "./src/routes/cartRoute.js";
import { CheckInventoryRouter } from "./src/routes/checkInventoryRoute.js";
import { DayRouter } from "./src/routes/dayRoute.js";
import { ExpensesRouter } from "./src/routes/expensesRoute.js";
import { LogsRouter } from "./src/routes/logsRoute.js";
import { MaintenanceRouter } from "./src/routes/maintenanceRoute.js";
import { PaymentRouter } from "./src/routes/paymentRoute.js";
import { StockAdjustmentRouter } from "./src/routes/stockAdjustmentRoute.js";
import { StockInRouter } from "./src/routes/stockInRoute.js";
import { TransactionsRouter } from "./src/routes/transactionsRoute.js";
import { TransferInRouter } from "./src/routes/transferInRoute.js";
import { TransferOutRouter } from "./src/routes/transferOutRoute.js";
import { VoidRouter } from "./src/routes/voidRoute.js";
import { CryptoRouter } from "./src/routes/cryptoRoutes.js";

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

// Attach all API routes
app.use("/api/auth", AuthRouter);
app.use("/api/users", UsersRouter);
app.use("/api/suppliers", SuppliersRoute);
app.use("/api/locations", LocationsRoute);
app.use("/api/category", CategoryRoute);
app.use("/api/products", ProductsRoute);
app.use("/api/discounts", DiscountsRouter);
app.use("/api/inventory", InventoryRouter);
app.use("/api/customers", CustomersRouter);
app.use("/api/orders", OrdersRouter);
app.use("/api/delivery", DeliveryRouter);
app.use("/api/cart", CartRouter);
app.use("/api/check-inventory", CheckInventoryRouter);
app.use("/api/day", DayRouter);
app.use("/api/expenses", ExpensesRouter);
app.use("/api/logs", LogsRouter);
app.use("/api/maintenance", MaintenanceRouter);
app.use("/api/payments", PaymentRouter);
app.use("/api/stock-adjustments", StockAdjustmentRouter);
app.use("/api/stock-in", StockInRouter);
app.use("/api/transactions", TransactionsRouter);
app.use("/api/transferin", TransferInRouter);
app.use("/api/transferout", TransferOutRouter);
app.use("/api/void", VoidRouter);
app.use("/api/crypto", CryptoRouter);

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.IO server
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

// WebSocket token authentication middleware
io.use((socket, next) => {
  const token = socket.handshake.auth?.token;

  if (!token) {
    return next(new Error("Authentication error: Token missing"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded; // Attach user data to the socket object
    next();
  } catch (err) {
    console.error("Socket Authentication Error:", err.message);
    return next(new Error("Authentication error: Invalid token"));
  }
});

// WebSocket connection handler
io.on("connection", (socket) => {
  console.log(
    `New client connected: ${socket.id}, User: ${socket.user.username}`
  );

  socket.on("updateDatabase", (updateDatabase) => {
    io.emit("updateDatabase", updateDatabase); // Notify all clients
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;

// Start HTTP + WebSocket server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { io };

//X0Ahk7rEg6C(FjUa
