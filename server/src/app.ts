import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Time Management CRM API is running",
  });
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

export default app;