import Book from "../model/bookModel.js";
import HttpError from "../middleware/httpError.js";

// Get All Books
const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.render("books", { books });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

// Show Add Book Form
const getAddBook = (req, res) => {
  res.render("addBook");
};

// Add Book (NO multer)
const addBook = async (req, res, next) => {
  try {
    const { title, author, description, price, coverImage } = req.body;

    const newBook = new Book({
      title,
      author,
      description,
      price,
      coverImage, // now just a string (URL or path)
    });

    await newBook.save();
    res.redirect("/books");

  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

// Show Edit Book Form
const getEditBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return next(new HttpError("Book not found", 404));
    }

    res.render("editBook", { book });

  } catch (error) {
    next(new HttpError("Invalid Book ID", 400));
  }
};

// Update Book (NO multer)
const updateBook = async (req, res, next) => {
  try {
    const { title, author, description, price, coverImage } = req.body;

    const book = await Book.findById(req.params.id);

    if (!book) {
      return next(new HttpError("Book not found", 404));
    }

    book.title = title;
    book.author = author;
    book.description = description;
    book.price = price;
    book.coverImage = coverImage;

    await book.save();

    res.redirect("/books");

  } catch (error) {
    next(new HttpError("Invalid Book ID", 400));
  }
};

// Delete Book
const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return next(new HttpError("Book not found", 404));
    }

    await book.deleteOne();

    res.redirect("/books");

  } catch (error) {
    next(new HttpError("Invalid Book ID", 400));
  }
};

export default {
  getAllBooks,
  getAddBook,
  addBook,
  getEditBook,
  updateBook,
  deleteBook,
};