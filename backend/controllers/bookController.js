const express = require("express");
const router = require("express").Router();
const bookRepository = require("../repositories/booksRepository");
const {authenticate} = require('../middleware/auth');

router.use(express.json());

router.get("/:id", (req, res) => {
  const id = req.params.id;

  const book = bookRepository.getBookById(id);

  if (!book) {
    return res.status(404).json({
      success: false,
      error: "No book with that id",
    });
  }

  return res.status(200).json({
    success: true,
    data: book,
  });
});

router.get("/", (req, res) => {
  const books = bookRepository.getAllBooks();

  res.status(200).json({
    success: true,
    data: books,
  });
});

router.post("/", authenticate, (req, res) => {
  let newBook = req.body;
  newBook = bookRepository.createBook(newBook);
  res.status(201).json({
    success: true,
    data: newBook,
  });
});

router.put("/:id", authenticate, (req, res) => {
  const id = req.params.id;

  const editedBook = bookRepository.editBookBy(id, req.body);

  if (editedBook) {
    return res.status(200).json({
      success: true,
      data: editedBook,
    });
  }

  res.status(404).json({
    success: false,
    error: "Book with this id doesnt exist",
  });
});

router.delete("/:id", authenticate, (req, res) => {
  const id = req.params.id;
  bookRepository.deleteBookBy(id);

  res.status(200).json({
    success: "true",
  });
});

module.exports = router;
