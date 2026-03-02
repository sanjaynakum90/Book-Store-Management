import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Book name is required"],
            trim: true,
        },
        author: {
            type: String,
            required: [true, "Author name is required"],
            trim: true,
        },
        publishDate: {
            type: String,
            trim: true,
        },
        price: {
            type: Number,
            min: [0, "Price cannot be negative"],
        },
    },
    { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;