import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (e) {
    next(e);
  }
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Notes API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
