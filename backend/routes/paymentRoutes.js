const express = require('express');
const { createPayment } = require('../controllers/paymentController');
const auth = require('../middlewares/authMiddleware');
const { check } = require('express-validator');
const router = express.Router();

router.post('/payment', [
  auth,
  check('recipientAccountNumber', 'Recipient account number is required').notEmpty(),
  check('recipientBankName', 'Recipient bank is required').notEmpty(),
  check('recipientAccOwnerName', 'Recipient name is required').notEmpty(),
  check('accountType', 'Account type is required').notEmpty(),
  check('swiftCode', 'SWIFT code is required').notEmpty(),
  check('amount', 'Amount is required').notEmpty(),
  check('currency', 'Currency is required').notEmpty(),
  check('bankName', 'Bank Name is required').notEmpty(),
], createPayment);

module.exports = router;
