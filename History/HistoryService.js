const historyDatabase = require('./HistoryRepository.js');
const authApi = require('./helpers/callsToAuth.js');

const addAttempt = async (jwtToken, questionId) => {
  try {

    // Check for missing inputs
    if (!jwtToken || !questionId) {
      throw Object.assign(new Error('Missing inputs'), { status: 400 });
    }

    // Decrypt jwtToken to get userId
    const decryptedUser = await authApi.authorize(jwtToken);
    const userId = decryptedUser.data.userInfo.userId;

    // Create using with userId and questionId
    await historyDatabase.addAttempt(userId, questionId);
  } catch (err) {
    throw err;
  }
};


// TODO: Change UserId to JWT Token input. Decrypt JWT Token to get UserId.
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

const getAttempts = async (jwtToken) => {
  try {
    if (!jwtToken) {
      throw Object.assign(new Error('Missing inputs'), { status: 400 });
    }

    // Decrypt jwtToken to get userId
    const decryptedUser = await authApi.authorize(jwtToken);
    const userId = decryptedUser.data.userInfo.userId;

    return historyDatabase.getAttempts(userId);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addAttempt,
  deleteUserAttempts,
  getAttempts,
};
