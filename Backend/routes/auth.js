// routes/auth.js
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const authController = require('../controllers/authController');

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/login',
  [
    check('username', 'Please include a valid username').exists(),
    check('password', 'Password is required').exists(),
  ],
  authController.login
);

// @route   POST api/auth/signup
// @desc    Register user
// @access  Public
router.post(
  '/signup',
  [
    check('username', 'Please include a valid username').isLength({ min: 3 }),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  authController.signup
);

module.exports = router;
