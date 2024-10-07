const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  idNumber: { 
    type: String, 
    required: true, 
    unique: true,
    validate: {
      validator: function(v) {
        return /^\d{13}$/.test(v); // Validate exactly 13 numeric characters
      },
      message: props => `${props.value} is not a valid ID number. It must be 13 digits.`
    }
  },
  accountNumber: { 
    type: String, 
    required: true, 
    unique: true,
    validate: {
      validator: function(v) {
        return /^\d+$/.test(v); // Validate numeric characters only
      },
      message: props => `${props.value} is not a valid account number. It must contain only numbers.`
    }
  },
  password: { 
    type: String, 
    required: true,
    validate: {
      validator: function(v) {
        return /^(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/.test(v); // Validate password criteria
      },
      message: 'Password must be at least 8 characters long and include at least one number and one special character'
    }
  },
});

// Hash password before saving the user
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', UserSchema);
