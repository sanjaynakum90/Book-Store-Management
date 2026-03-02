import Book from "../models/bookModel.js";
import HttpError from "../middleware/HttpError.js";
import mongoose from "mongoose";

// Helper: validate MongoDB ObjectId
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// GET /books — get all books (with optional pagination)
export const getAllBooks = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const totalBooks = await Book.countDocuments();
        const books = await Book.find().skip(skip).limit(limit).sort({ createdAt: -1 });

        res.status(200).json({
            message: "Books retrieved successfully",
            total: totalBooks,
            page,
            totalPages: Math.ceil(totalBooks / limit),
            books,
        });
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
};

// GET /books/:id — get a single book by ID
export const getBookById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!isValidId(id)) {
            return next(new HttpError("Invalid book ID", 400));
        }

        const book = await Book.findById(id);
        if (!book) {
            return next(new HttpError("Book not found", 404));
        }

        res.status(200).json({ message: "Book retrieved successfully", book });
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
};

// POST /books — create a new book
export const createBook = async (req, res, next) => {
    try {
        const { name, author, publishDate, price } = req.body;

        if (!name || !author) {
            return next(new HttpError("Name and author are required fields", 400));
        }

        const newBook = new Book({ name, author, publishDate, price });
        await newBook.save();

        res.status(201).json({ message: "Book created successfully", book: newBook });
    } catch (error) {
        if (error.name === "ValidationError") {
            return next(new HttpError(error.message, 400));
        }
        next(new HttpError(error.message, 500));
    }
};

// PUT /books/:id — update a book
export const updateBook = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!isValidId(id)) {
            return next(new HttpError("Invalid book ID", 400));
        }

        const { name, author, publishDate, price } = req.body;

        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { name, author, publishDate, price },
            { new: true, runValidators: true }
        );

        if (!updatedBook) {
            return next(new HttpError("Book not found", 404));
        }

        res.status(200).json({ message: "Book updated successfully", book: updatedBook });
    } catch (error) {
        if (error.name === "ValidationError") {
            return next(new HttpError(error.message, 400));
        }
        next(new HttpError(error.message, 500));
    }
};

// DELETE /books/:id — delete a book
export const deleteBook = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!isValidId(id)) {
            return next(new HttpError("Invalid book ID", 400));
        }

        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {
            return next(new HttpError("Book not found", 404));
        }

        res.status(200).json({ message: "Book deleted successfully", book: deletedBook });
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
};

// GET /books/search?name=&author=&minPrice=&maxPrice= — search & filter books
export const searchBooks = async (req, res, next) => {
    try {
        const { name, author, minPrice, maxPrice } = req.query;
        const filter = {};

        if (name) filter.name = { $regex: name, $options: "i" };
        if (author) filter.author = { $regex: author, $options: "i" };
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = parseFloat(minPrice);
            if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
        }

        const books = await Book.find(filter).sort({ createdAt: -1 });

        res.status(200).json({
            message: "Search results",
            total: books.length,
            books,
        });
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
};