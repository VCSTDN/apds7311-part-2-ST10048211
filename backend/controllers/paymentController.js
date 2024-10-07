const Payment = require('../models/Payment'); // Import the Payment model

exports.createPayment = async (req, res) => {
  const {
    recipientAccountNumber,
    recipientBankName,
    recipientAccOwnerName,
    accountType,
    swiftCode,
    amount,
    currency,
    bankName,
  } = req.body;


  try {
    const payment = new Payment({
      userId: req.user.id, // Get user ID from the authenticated user
      recipientAccountNumber,
      recipientBankName,
      recipientAccOwnerName,
      accountType,
      swiftCode,
      amount,
      currency,
      bankName,
    });

    // Save the payment to the database
    await payment.save();

    res.json(payment); // Respond with the saved payment details
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
