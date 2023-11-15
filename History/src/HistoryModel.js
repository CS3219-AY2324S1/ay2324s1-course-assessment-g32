const mongoose = require('mongoose');

// Extract the schema from mongoose object
const Schema = mongoose.Schema;

const HistorySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    questionId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    output: {
      type: String,
    },
    duration: {
      type: Number,
    },
  },
  { timestamps: true }
);

// Create a model named "History", which represents a collection in the database
const History = mongoose.model('History', HistorySchema);

module.exports = History;
