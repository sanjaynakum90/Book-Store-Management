import express from "express";
import dotenv from "dotenv";

import HttpError from "./middleware/httpError.js";
import bookRoutes from "./routes/bookRoutes.js";
import connectDb from "./config/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

/* 🔥 IMPORTANT: Body Parsers */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes */
app.use("/books", bookRoutes);

app.get("/", (req, res) => res.redirect("/books"));

/* 404 Handler */
app.use((req, res, next) => {
  next(new HttpError("Route not found", 404));
});

/* Global Error Handler */
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    message: error.message || "Internal Server Error",
  });
});

const startServer = async () => {
  try {
    const connect = await connectDb();

    if (!connect) {
      throw new Error("Failed to connect to the database");
    }

    console.log("✅ Database connected");

    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });

  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

startServer(); 