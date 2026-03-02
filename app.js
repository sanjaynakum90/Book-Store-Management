import express from "express";
import HttpError from "./middleware/HttpError.js";
import bookRouter from "./routes/bookRoutes.js";
import connectDB from "./db/db.js";

const app = express();
app.use(express.json());

app.use("/books", bookRouter);

app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the Bookstore Management API" });
});



app.use((req, res, next) => {
    next(new HttpError("Route Not Found", 404));
});

// Global error handler
app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    res
        .status(error.statusCode || 500)
        .json({ message: error.message || "Server Error" });
});

const port = process.env.PORT || 5000;

async function serverStart() {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

serverStart();