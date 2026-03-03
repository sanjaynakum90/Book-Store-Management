import fs from "fs";

import Book from "../model/bookModel.js"
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


// Add Book

const addBook = async (req, res, next) => {
  try {
    const { title, author, description, price } = req.body;

    const coverImage = req.files?.coverImage?.[0]?.path;

    const galleryImages =
      req.files?.galleryImages?.map((file) => file.path) || [];

    const newBook = new Book({
      title,
      author,
      description,
      price,
      coverImage,
      galleryImages,
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


// Update Book

const updateBook = async (req, res, next) => {
  try {
    const { title, author, description, price } = req.body;

    const book = await Book.findById(req.params.id);

    if (!book) {
      return next(new HttpError("Book not found", 404));
    }

    const newCoverImage = req.files?.coverImage?.[0]?.path;

    if (newCoverImage) {
      if (book.coverImage && fs.existsSync(book.coverImage)) {
        fs.unlinkSync(book.coverImage);
      }
      book.coverImage = newCoverImage;
    }

    // Replace gallery images if new ones uploaded
    const newGalleryImages =
      req.files?.galleryImages?.map((file) => file.path);

    if (newGalleryImages && newGalleryImages.length > 0) {

      if (book.galleryImages?.length) {
        book.galleryImages.forEach((file) => {
          if (fs.existsSync(file)) {
            fs.unlinkSync(file);
          }
        });
      }

      book.galleryImages = newGalleryImages;
    }

    book.title = title;
    book.author = author;
    book.description = description;
    book.price = price;

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

    // Delete cover image
    if (book.coverImage && fs.existsSync(book.coverImage)) {
      fs.unlinkSync(book.coverImage);
    }

    // Delete gallery images
    if (book.galleryImages?.length) {
      book.galleryImages.forEach((file) => {
        if (fs.existsSync(file)) {
          fs.unlinkSync(file);
        }
      });
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
