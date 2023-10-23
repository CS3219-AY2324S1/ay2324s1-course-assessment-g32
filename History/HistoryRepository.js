const historyModel = require('./HistoryModel');
const mongoose = require('mongoose');

const findAttemptByUserIdAndQuestion = async (userId, questionId) => {
  try {
    return await historyModel.findOne({ userId: userId, questionId: questionId });
  } catch (err) {
    throw err;
  }
};

const addAttempt = async (userId, questionId, code) => {
  // Add new attempt to database
  try {
    const history = new historyModel({
      userId: userId,
      questionId: new mongoose.Types.ObjectId(questionId),
      code: code,
    });

    await history.save();
  } catch (err) {
    throw err;
  }
};


const deleteAttemptsByUserId = async (userId) => {
  return
};

const getAttemptsByUserId = async (userId) => {
  return
};

const deleteAttemptsByQuestionId = async (questionId) => {
  return
};

module.exports = {
  findAttemptByUserIdAndQuestion,
  addAttempt,
  deleteAttemptsByUserId,
  getAttemptsByUserId,
  deleteAttemptsByQuestionId,
};
