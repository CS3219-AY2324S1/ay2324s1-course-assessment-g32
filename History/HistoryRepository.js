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
      questionId: questionId,
      code: code,
    });

    await history.save();
  } catch (err) {
    throw err;
  }
};

const deleteAttemptsByUserId = async (userId) => {
  try {
    await historyModel.deleteMany({ userId: userId });
  } catch (err) {
    throw err;
  }
};

const getAttemptsByUserId = async (userId) => {
  try {
    return await historyModel.find({ userId: userId });
  } catch (err) {
    throw err;
  }
};

const deleteAttemptsByQuestionId = async (questionId) => {
  try {
    await historyModel.deleteMany({ questionId: questionId });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  findAttemptByUserIdAndQuestion,
  addAttempt,
  deleteAttemptsByUserId,
  getAttemptsByUserId,
  deleteAttemptsByQuestionId,
};
