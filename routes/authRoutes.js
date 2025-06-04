const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const { body, validationResult } = require("express-validator");

// Validation middlewares
const validateRegister = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 chars"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateLogin = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Routes with validation
router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

module.exports = router;
