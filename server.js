import express from "express";
import dotenv from "dotenv";
import { AuthRouter } from "./src/routes/authRoute.js";
import { UsersRouter } from "./src/routes/UsersRoute.js";

dotenv.config();

const app = express();
app.use(express.json());

// Authentication routes
app.use("/api/auth", AuthRouter);

// Users routes
app.use("/api/users", UsersRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
