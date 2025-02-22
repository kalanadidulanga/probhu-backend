// src/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import servicesRouter from "./routes/services.routes.js";
import clientsRouter from "./routes/clients.routes.js";
import reviewsRouter from "./routes/reviews.routes.js";
import appointmentsRouter from "./routes/appointments.routes.js";
import contactRouter from "./routes/contact.routes.js";
// import packagesRouter from './routes/packages.routes.js';
import package2Router from "./routes/package2.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import packageRoutes from "./routes/package.routes.js";
import serviceItemRoutes from "./routes/serviceItem.routes.js";

import { errorHandler } from "./middleware/error.middleware.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.get("/api", (req, res) => {
  res.send("Hello, API!");
});
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/services", servicesRouter);
app.use("/api/clients", clientsRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/appointments", appointmentsRouter);
app.use("/api/contact", contactRouter);
// app.use('/api/packages', packagesRouter);
// app.use('/api', packageRoutes);
app.use("/api/package2", package2Router);
app.use("/api/categories", categoryRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/service-items", serviceItemRoutes); // Updated route

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
