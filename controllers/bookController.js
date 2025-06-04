const Book = require("../models/Book");

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find({ user: req.user._id });
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.addBook = async (req, res) => {
  const { title, author } = req.body;
  try {
    const book = await Book.create({ title, author, user: req.user._id });
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: "Failed to add book" });
  }
};

exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete book" });
  }
};

exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author } = req.body;
  try {
    const book = await Book.findByIdAndUpdate(
      id,
      { title, author },
      { new: true }
    );
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: "Failed to update book" });
  }
};
