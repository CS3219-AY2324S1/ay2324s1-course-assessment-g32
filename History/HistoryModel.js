const mongoose = require('mongoose');

// Extract the schema from mongoose object
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
  userId: {
    type: Number,
    required: true,
  },
  questionId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  code: {
    type: String,
  }
}, {timestamps: true});

// Create a model named "History", which represents a collection in the database
const History = mongoose.model('History', HistorySchema);

module.exports = History;
