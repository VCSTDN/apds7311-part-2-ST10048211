const express = require('express');
const { register, login } = require('../controllers/authController');
const { check } = require('express-validator');
const router = express.Router();

router.post('/register', [
  check('fullName', 'Full name is required').notEmpty(),
  check('idNumber', 'ID number is required').notEmpty(),
  check('accountNumber', 'Account number is required').notEmpty(),
  check('password', 'Password must be at least 8 characters').isLength({ min: 8 }),
], register);

router.post('/login', [
  check('username', 'Username is required').notEmpty(),
  check('accountNumber', 'Account number is required').notEmpty(),
  check('password', 'Password is required').exists(),
], login);

module.exports = router;
