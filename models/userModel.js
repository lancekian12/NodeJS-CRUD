const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please enter your first name'],
  },
  lastName: {
    type: String,
    required: [true, 'Please enter your last name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    maxlength: 20,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: `Password are not the same!`,
    },
  },
  passwordChangedAt: Date,
});

userSchema.pre('save', async function (next) {
  //! Only run this function if password was actually modifed
  if (!this.isModified('password')) return next();

  this.passwordChangedAt = Date.now() - 1000;

  //! Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //! Delete confirmPassword field
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedPasswordTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    return JWTTimestamp < changedPasswordTimestamp;
  }
  // False means NOT changed
  return false;
};
const User = mongoose.model('User', userSchema);

module.exports = User;
