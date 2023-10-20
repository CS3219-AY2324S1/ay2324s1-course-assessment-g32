const historyDatabase = require('./HistoryRepository.js');

const addAttempt = async (userId, questionId, code) => {
  try {
    // Check for missing inputs
    if (!userId || !questionId || !code) {
      throw Object.assign(new Error('Missing inputs'), { status: 400 });
    }

    // Create using with userId and questionId
    await historyDatabase.addAttempt(userId, questionId, code);
  } catch (err) {
    throw err;
  }
};

const deleteUserAttempts = async (userId) => {
  try {

    // Check for missing input
    if (!userId) {
      throw Object.assign(new Error('Missing input'), { status: 400 });
    }

    // Delete attempts
    await historyDatabase.deleteUserAttempts(userId);
  } catch (err) {
    throw err;
  }
};

const getAttempts = async (userId) => {
  try {
    if (!userId) {
      throw Object.assign(new Error('Missing inputs'), { status: 400 });
    }

    const attempts = await historyDatabase.getAttempts(userId);
    console.log(attempts);

    return attempts;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addAttempt,
  deleteUserAttempts,
  getAttempts,
};
