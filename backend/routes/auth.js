const express = require('express');
const router = express.Router();
const { signup, login, getEmail } = require('../controllers/authController');
const { check } = require('express-validator');

router.post(
  '/signup',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  signup
);

router.post(
  '/login',
  [
    check('loginIdentifier', 'Please include a valid email or username').not().isEmpty(),
    check('password', 'Password is required').exists()
  ],
  login
);

router.post('/get-email', getEmail);

module.exports = router;
