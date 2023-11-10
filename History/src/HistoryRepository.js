const historyModel = require('./HistoryModel');

exports.findAttemptByUserIdAndQuestion = async (userId, questionId) => {
  try {
    return await historyModel.findOne({ userId: userId, questionId: questionId });
  } catch (err) {
    throw err;
  }
};

exports.addAttempt = async (userId, questionId, code, language, result) => {
  // Add new attempt to database
  try {
    const history = new historyModel({
      userId: userId,
      questionId: questionId,
      code: code,
      language: language,
      output: result.output,
      duration: result.duration,
    });

    await history.save();
  } catch (err) {
    throw err;
  }
};

exports.getAttemptsByUserId = async (userId) => {
  try {
    return await historyModel.find({ userId: userId }).sort({ createdAt: -1 });
  } catch (err) {
    throw err;
  }
};

exports.getAttemptById = async (attemptId) => {
  try {
    return await historyModel.findById(attemptId);
  } catch (err) {
    throw err;
  }
};

exports.getAttemptsByQuestionAndUser = async (questionId, userId) => {
  try {
    return await historyModel.find({ questionId: questionId, userId: userId }).sort({ createdAt: -1 });
  } catch (err) {
    throw err;
  }
};
