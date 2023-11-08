const mongoose = require('mongoose');

// Extract the schema from mongoose object
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  displayName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100,
  },
  password: {
    type: String,
    required: true,
    maxlength: 200,
  },
  isMaintainer: {
    type: Boolean,
    required: true,
    default: false,
  },
  language: {
    type: String,
    required: false,
    maxlength: 10,
  },
  complexity: {
    type: String,
    required: false,
    maxlength: 10,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// Define a pre-update middleware to update the updatedAt field before updating the document
UserSchema.pre('findOneAndUpdate', function (next) {
  this._update.updatedAt = new Date();
  next();
});

// Create a model named "User", which represents a collection in the database
const User = mongoose.model('User', UserSchema);
module.exports = User;
