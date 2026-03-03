import express from "express";
import bookController from "../controller/bookController.js";

const router = express.Router();

router.get("/", bookController.getAllBooks);

router.get("/add", bookController.getAddBook);

router.post("/add", bookController.addBook);

router.get("/edit/:id", bookController.getEditBook);

router.post("/edit/:id", bookController.updateBook);

router.post("/delete/:id", bookController.deleteBook);

export default router;