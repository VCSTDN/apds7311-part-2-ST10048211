const express = require('express');
const { register, login } = require('../controllers/authController');
const { check } = require('express-validator');
const router = express.Router();

router.post('/register', [
  check('fullName', 'Full name is required').notEmpty(),
  check('idNumber', 'ID number must be exactly 13 digits').isLength({ min: 13, max: 13 }).isNumeric(),
  check('accountNumber', 'Account number is required and must be numeric').notEmpty().isNumeric(),
  check('password', 'Password must be at least 8 characters, include at least one number, and one special character')
    .isLength({ min: 8 })
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])/),
], register);

router.post('/login', [
  check('username', 'Username is required').notEmpty(),
  check('accountNumber', 'Account number is required and must be numeric').notEmpty().isNumeric(),
  check('password', 'Password is required').exists(),
], login);

module.exports = router;
