const historyService = require('./HistoryService.js');
const questionApi = require('./helpers/callsToQuestion.js');

const addAttempt = async (req, res) => {
  try {
    const { userId, questionId, code, language } = req.body;
    await historyService.addAttempt(userId, questionId, code, language);
    res.json({ message: 'SUCCESS: History attempt added' });
  } catch (err) {
    res.status(err?.status || 400).json({ error: err?.message || err });
  }
};

const deleteUserAttempts = async (req, res) => {
  try {
    const { userId } = req.body;
    await historyService.deleteUserAttempts(userId);
    res.json({ message: 'SUCCESS: History attempts deleted' });
  } catch (err) {
    res.status(err?.status || 400).json({ error: err?.message || err });
  }
};

const getAttempts = async (req, res) => {
  try {
    const { userId, questionId } = req.query;
    if (questionId) {
      const attempts = await historyService.getAttemptsByQuestionAndUser(questionId, userId);
      res.json({ message: 'SUCCESS', attempts });
    } else {
      const jwtToken = req.headers['authorization'];
      const attempts = await historyService.getAttempts(userId);
      const questionResponse = await questionApi.appendQuestionTitle(jwtToken, attempts);
      const attemptsWithTitles = questionResponse.data.attemptsWithTitles;
      res.json({ message: 'SUCCESS', attemptsWithTitles });
    }
  } catch (err) {
    res.status(err?.status || 400).json({ error: err?.message || err });
  }
};

const getHeatMapData = async (req, res) => {
  try {
    const { userId } = req.query;
    const heatMapData = await historyService.getHeatMapData(userId);
    res.json({ message: 'SUCCESS', heatMapData });
  } catch (err) {
    res.status(err?.status || 400).json({ error: err?.message || err });
  }
};

const getPieChartData = async (req, res) => {
  try {
    const jwtToken = req.headers['authorization'];
    const { userId } = req.query;
    const attemptedQuestionsId = await historyService.getAttemptedQuestionsId(userId);
    const attemptedQuestionsStats = await questionApi.getQuestionDifficultyCount(jwtToken, attemptedQuestionsId);
    const allQuestionsStats = await questionApi.getQuestionStatistics(jwtToken);
    const unattemptedQuestionsStats = historyService.getUnattemptedQuestionsStats(
      attemptedQuestionsStats.data.questionCountByDifficulty, allQuestionsStats.data.questionStatistics);

    const pieChartData = {
      attemptedQuestionsStats: attemptedQuestionsStats.data.questionCountByDifficulty,
      allQuestionsStats: allQuestionsStats.data.questionStatistics,
      unattemptedQuestionsStats: unattemptedQuestionsStats,
    };

    res.json({ message: 'SUCCESS', pieChartData });
  } catch (err) {
    res.status(err?.status || 400).json({ error: err?.message || err });
  }
};

const getAttempt = async (req, res) => {
  try {
    const { attemptId } = req.query;
    const attempt = await historyService.getAttempt(attemptId);
    res.json({ message: 'SUCCESS', attempt });
  } catch (err) {
    res.status(err?.status || 400).json({ error: err?.message || err });
  }
};

module.exports = {
  addAttempt,
  deleteUserAttempts,
  getAttempts,
  getHeatMapData,
  getPieChartData,
  getAttempt,
};
