const historyModel = require('./HistoryModel');
const mongoose = require('mongoose');

const findAttemptByUserIdAndQuestion = async (userId, questionId) => {
  try {
    return await historyModel.findOne({ userId: userId, questionId: questionId });
  } catch (err) {
    throw err;
  }
};

const addAttempt = async (userId, questionId, code, language) => {
  // Add new attempt to database
  try {
    const history = new historyModel({
      userId: userId,
      questionId: questionId,
      code: code,
      language: language,
    });

    await history.save();
  } catch (err) {
    throw err;
  }
};

const getAttemptsByUserId = async (userId) => {
  try {
    return await historyModel.find({ userId: userId }).sort({ createdAt: -1 });
  } catch (err) {
    throw err;
  }
};

const getAttemptById = async (attemptId) => {
  try {
    return await historyModel.findById(attemptId);
  } catch (err) {
    throw err;
  }
};

const getAttemptsByQuestionAndUser = async (questionId, userId) => {
  try {
    return await historyModel.find({ questionId: questionId, userId: userId }).sort({ createdAt: -1 });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  findAttemptByUserIdAndQuestion,
  addAttempt,
  getAttemptsByUserId,
  getAttemptById,
  getAttemptsByQuestionAndUser,
};
