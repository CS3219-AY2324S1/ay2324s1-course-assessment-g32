const historyDatabase = require('./HistoryRepository.js');

const addAttempt = async (userId, questionId) => {
  try {
    let passExistingAttemptCheck = undefined;

    // Check for missing inputs
    if (!userId || !questionId) {
      throw Object.assign(new Error('Missing inputs'), { status: 400 });
    }

    // Check if the user has already attempted the question
    const existingAttemptCheck = historyDatabase.findAttemptByEmailAndQuestion(userId, questionId).then((attempt) => {
      passExistingAttemptCheck = attempt['timeStamp'] === null;
    });

    // Check results of existingAttemptCheck
    await existingAttemptCheck;
    if (passExistingAttemptCheck === undefined) {
      console.error('No results from existingUserCheck');
    }
    if (!passExistingAttemptCheck) {
      throw Object.assign(new Error('User has already attempted this question'), { status: 409 });
    }

    // Create using with userId and questionId
    await historyDatabase.addAttempt(userId, questionId);
  } catch (err) {
    throw err;
  }
};

const deleteAttempt = async (userId, questionId) => {
  try {

    let passExistingAttemptCheck = undefined;

    // Check for missing inputs
    if (!userId || !questionId) {
      throw Object.assign(new Error('Missing inputs'), { status: 400 });
    }

    // Check if the user has already attempted the question
    const existingAttemptCheck = historyDatabase.findAttemptByEmailAndQuestion(userId, questionId).then((attempt) => {
      passExistingAttemptCheck = attempt['timeStamp'] !== null;
    });

    // Check results of existingAttemptCheck
    await existingAttemptCheck;
    if (passExistingAttemptCheck === undefined) {
      console.error('No results from existingUserCheck');
    }
    if (!passExistingAttemptCheck) {
      throw Object.assign(new Error('User has not attempted this question yet'), { status: 409 });
    }

    // Delete attempt
    await historyDatabase.deleteAttempt(userId, questionId);
  } catch (err) {
    throw err;
  }
};

const getAttempts = async (userId) => {
  try {
    if (!userId) {
      throw Object.assign(new Error('Missing inputs'), { status: 400 });
    }
    return historyDatabase.getAttempts(userId);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addAttempt,
  deleteAttempt,
  getAttempts,
};
