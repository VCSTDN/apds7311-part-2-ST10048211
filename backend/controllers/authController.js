const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// exports.register = async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  
//     const { fullName, username, idNumber, accountNumber, password } = req.body;
//     try {
//       let user = await User.findOne({ $or: [{ accountNumber }, { username }] });
//       if (user) return res.status(400).json({ msg: 'User already exists' });
  
//       user = new User({ fullName, username, idNumber, accountNumber, password });
//       await user.save();
  
//       const payload = { user: { id: user.id } };
//       const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
//       res.json({ token });
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server error');
//     }
//   };


exports.register = async (req, res) => {
  console.log("Register request received");

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      console.log("Validation errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, username, idNumber, accountNumber, password } = req.body;
  
  try {
      let user = await User.findOne({ $or: [{ accountNumber }, { username }] });
      if (user) {
          console.log("User already exists");
          return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({ fullName, username, idNumber, accountNumber, password });
      await user.save();

      const payload = { user: { id: user.id } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
      
      console.log("User registered successfully");
      res.json({ token });
  } catch (err) {
      console.error("Server error:", err.message);
      res.status(500).send('Server error');
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
      res.json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  
