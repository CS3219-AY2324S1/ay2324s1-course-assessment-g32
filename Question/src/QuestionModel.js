const mongoose = require('mongoose');

// Extract the schema from mongoose object
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  complexity: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'], // Define the allowed values here
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: false,
  },
});

// Create a model named "Question", which represents a collection in the database
const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
