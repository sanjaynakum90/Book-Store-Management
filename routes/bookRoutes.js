import express from "express";
import {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    searchBooks,
} from "../controllers/bookController.js";

const router = express.Router();

router.get("/search", searchBooks);

// GET /books — get all books
router.get("/", getAllBooks);

// GET /books/:id 
router.get("/:id", getBookById);

// POST /books 
router.post("/", createBook);

// PUT /books/:id 
router.put("/:id", updateBook);

// DELETE /books/:id 
router.delete("/:id", deleteBook);

export default router;