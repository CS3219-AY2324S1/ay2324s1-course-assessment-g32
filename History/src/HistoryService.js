const historyDatabase = require('./HistoryRepository');
const { Status } = require('./constants');

const summationOfCounts = (counts) => {
  return Object.values(counts).reduce((acc, val) => acc + val, 0);
};

const addAttempt = async (userId, questionId, code, language) => {
  try {
    // Check for missing inputs
    if (!userId || !questionId || !language) {
      throw { status: Status.BAD_REQUEST, message: 'Missing inputs' };
    }

    // Check if code is empty
    if (!code) {
      throw { status: Status.BAD_REQUEST, message: 'Code cannot be empty' };
    }

    // Create using with userId and questionId
    await historyDatabase.addAttempt(userId, questionId, code, language);
  } catch (err) {
    throw err;
  }
};

const getAttempts = async (userId) => {
  try {
    if (!userId) {
      throw { status: Status.BAD_REQUEST, message: 'Missing inputs' };
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
      throw { status: Status.BAD_REQUEST, message: 'Missing inputs' };
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
      throw { status: Status.BAD_REQUEST, message: 'Missing inputs' };
    }
    const result = await historyDatabase.getAttemptsByUserId(userId);
    const questionsId = result.map(item => item.questionId);
    return questionsId;
  } catch (err) {
    throw err;
  }
};

const getUnattemptedQuestionsStats = (attemptedQuestionsStats, allQuestionsStats) => {
  totalAttemptedQuestions = summationOfCounts(attemptedQuestionsStats);
  totalQuestions = summationOfCounts(allQuestionsStats);
  return { count: totalQuestions - totalAttemptedQuestions };
};

const getAttempt = async (attemptId) => {
  try {
    if (!attemptId) {
      throw { status: Status.BAD_REQUEST, message: 'Missing inputs' };
    }
    const attempt = await historyDatabase.getAttemptById(attemptId);
    if (!attempt) {
      throw { status: Status.GONE, message: 'Attempt does not exist' };
    }
    return attempt;
  } catch (err) {
    throw err;
  }
};

const getAttemptsByQuestionAndUser = async (questionId, userId) => {
  try {
    if (!questionId || !userId) {
      throw { status: Status.BAD_REQUEST, message: 'Missing inputs' };
    }
    const attempts = await historyDatabase.getAttemptsByQuestionAndUser(questionId, userId);
    return attempts;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addAttempt,
  getAttempts,
  getHeatMapData,
  getAttemptedQuestionsId,
  getUnattemptedQuestionsStats,
  getAttempt,
  getAttemptsByQuestionAndUser,
};
