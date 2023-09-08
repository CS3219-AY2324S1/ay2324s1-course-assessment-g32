const mongoose = require('mongoose');

// Extract the schema from mongoose object
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Create a model named "User", which represents a collection in the database
const User = mongoose.model("User", UserSchema);

module.exports = User;
