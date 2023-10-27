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
    await historyDatabase.deleteAttemptsByUserId(userId);
  } catch (err) {
    throw err;
  }
};

const getAttempts = async (userId) => {
  try {
    if (!userId) {
      throw Object.assign(new Error('Missing inputs'), { status: 400 });
    }
    const attempts = await historyDatabase.getAttemptsByUserId(userId);
    return attempts;
  } catch (err) {
    throw err;
  }
};

const getHeatMapData = async (userId) => {
  try {
    if (!userId) {
      throw Object.assign(new Error('Missing inputs'), { status: 400 });
    }
    const result = await historyDatabase.getAttemptsByUserId(userId);

    const countByDate = result.reduce((acc, curr) => {
      const date = new Date(curr.createdAt);
      const formattedDate = date.toISOString().slice(0, 10); // Extract the date part only

      const foundIndex = acc.findIndex(item => item.date === formattedDate);

      if (foundIndex !== -1) {
        acc[foundIndex].count += 1;
      } else {
        acc.push({ date: formattedDate, count: 1 });
      }
      return acc;
    }, []);

    return countByDate;
  } catch (err) {
    throw err;
  }
};

const getAttemptedQuestionsId = async (userId) => {
  try {
    if (!userId) {
      throw Object.assign(new Error('Missing inputs'), { status: 400 });
    }
    const result = await historyDatabase.getAttemptsByUserId(userId);
    const questionsId = result.map(item => item.questionId);
    return questionsId;
  } catch (err) {
    throw err;
  }
};

const getUnattemptedQuestionsStats = (attemptedQuestionsStats, allQuestionsStats) => {
  totalAttemptedQuestions = Object.values(attemptedQuestionsStats).reduce((acc, val) => acc + val, 0);
  totalQuestions = Object.values(allQuestionsStats).reduce((acc, val) => acc + val, 0);
  return { count: totalQuestions - totalAttemptedQuestions };
};

module.exports = {
  addAttempt,
  deleteUserAttempts,
  getAttempts,
  getHeatMapData,
  getAttemptedQuestionsId,
  getUnattemptedQuestionsStats,
};
