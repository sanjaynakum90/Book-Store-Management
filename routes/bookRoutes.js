import express from "express";
import bookController from "../controller/bookController.js";

const router = express.Router();

router.get("/", bookController.getAllBooks);

router.post("/add", bookController.addBook);

router.get("/:id", bookController.getSingleBook);

router.put("/:id", bookController.updateBook);

router.delete("/:id", bookController.deleteBook);

export default router;