const express = require("express");
const router = express.Router();
const {
  getBooks,
  addBook,
  deleteBook,
  updateBook,
} = require("../controllers/bookController");
const { protect } = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

// Validation middleware for adding a book
const validateBook = [
  body("title").notEmpty().withMessage("Title is required"),
  body("author").notEmpty().withMessage("Author is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

router.get("/", protect, getBooks);
router.post("/", protect, validateBook, addBook);
router.delete("/:id", protect, deleteBook);
router.put("/:id", protect, validateBook, updateBook);
module.exports = router;
