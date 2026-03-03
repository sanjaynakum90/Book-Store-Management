import Book from "../model/bookModel.js";
import HttpError from "../middleware/HttpError.js";

// Get All Books
const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

// Add Book
const addBook = async (req, res, next) => {
  try {
    const { title, author, description, price, coverImage } = req.body;

    const newBook = await Book.create({
      title,
      author,
      description,
      price,
      coverImage,
    });

    res.status(201).json({
      message: "Book added successfully",
      book: newBook,
    });

  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

// Get Single Book
const getSingleBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return next(new HttpError("Book not found", 404));
    }

    res.status(200).json(book);

  } catch (error) {
    next(new HttpError("Invalid Book ID", 400));
  }
};

// Update Book
const updateBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!book) {
      return next(new HttpError("Book not found", 404));
    }

    res.status(200).json({
      message: "Book updated successfully",
      book,
    });

  } catch (error) {
    next(new HttpError("Invalid Book ID", 400));
  }
};

// Delete Book
const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return next(new HttpError("Book not found", 404));
    }

    res.status(200).json({
      message: "Book deleted successfully",
    });

  } catch (error) {
    next(new HttpError("Invalid Book ID", 400));
  }
};

export default {
  getAllBooks,
  addBook,
  getSingleBook,
  updateBook,
  deleteBook,
};