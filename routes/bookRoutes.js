import express from "express";
import bookController from "../controller/bookController.js"
import upload from "../middleware/upload.js"

const router = express.Router();

const uploadFields = upload.fields([
  { name: "coverImage", maxCount: 1 },
  { name: "galleryImages", maxCount: 10 },
]);

router.get("/", bookController.getAllBooks);

router.get("/add", bookController.getAddBook);

router.post("/add", uploadFields, bookController.addBook);

router.get("/edit/:id", bookController.getEditBook);

router.post(
  "/edit/:id",
  uploadFields,
  bookController.updateBook
);

router.post("/delete/:id", bookController.deleteBook);

export default router;
