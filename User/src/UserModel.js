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

// Create a model named "User", which represents a collection in the database
const User = mongoose.model('User', UserSchema);

// Define a pre-save middleware to update the updatedAt field before saving the document
UserSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = User;
