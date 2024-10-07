const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');


exports.register = async (req, res) => {
  console.log("Register request received");

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      console.log("Validation errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
  } 

  const { fullName, username, idNumber, accountNumber, password, confirmPassword } = req.body;

  // Check for password match
  if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return res.status(400).json({ msg: 'Passwords do not match' });
  }

  // console.log(`Checking for existing user with accountNumber: ${accountNumber} or username: ${username}`);

  // try {
  //     // Check if user already exists
  //     let existingUser = await User.findOne({ $or: [{ accountNumber }, { username }] });
      
  //     if (existingUser) {
  //         console.log("User already exists:", existingUser); // Log the existing user
  //         return res.status(400).json({ msg: 'User already exists' });
  //     }
  // } catch (err) {
  //     console.error("Error checking existing users:", err.message);
  //     return res.status(500).send('Server error');
  // }

  // Create new user instance
  const newUser = new User({
      fullName,
      username,
      idNumber,
      accountNumber,
      password, // Ensure the password is hashed in your User model
  });

  // Save the new user
  try {
      await newUser.save();
      console.log("User registered successfully");

      const payload = { user: { id: newUser.id } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
  } catch (err) {
      console.error("Error saving new user:", err.message); // Log the error message
      if (err.name === 'ValidationError') {
          return res.status(400).json({ msg: err.message });
      }
      return res.status(500).send('Server error');
  }
};


  
  exports.login = async (req, res) => {
    const { username, accountNumber, password } = req.body;
    try {
      const user = await User.findOne({ username, accountNumber });
      if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
  
      const payload = { user: { id: user.id } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log(token);
      res.json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  
