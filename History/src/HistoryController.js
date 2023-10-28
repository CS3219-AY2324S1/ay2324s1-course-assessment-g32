const historyService = require('./HistoryService');
const questionApi = require('./helpers/callsToQuestion');
const { Status } = require('./constants');
const logger = require('./Log');

const addAttempt = async (req, res) => {
  try {
    const { userId, questionId, code, language } = req.body;
    await historyService.addAttempt(userId, questionId, code, language);
    logger.logSuccess('Attempt added');
    res.json({ message: 'SUCCESS: History attempt added' });
  } catch (err) {
    logger.error('Cannot add attempt:', err?.message || err);
    res.status(err?.status || Status.INTERNAL_SERVER_ERROR).json({ error: err?.message || err });
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
    logger.logSuccess('Attempts retrieved');
  } catch (err) {
    logger.error('Cannot retrieve attempts:', err?.message || err);
    res.status(err?.status || Status.INTERNAL_SERVER_ERROR).json({ error: err?.message || err });
  }
};

const getHeatMapData = async (req, res) => {
  try {
    const { userId } = req.query;
    const heatMapData = await historyService.getHeatMapData(userId);
    logger.logSuccess('Heatmap data retrieved');
    res.json({ message: 'SUCCESS', heatMapData });
  } catch (err) {
    logger.error('Cannot retrieve heatmap data:', err?.message || err);
    res.status(err?.status || Status.INTERNAL_SERVER_ERROR).json({ error: err?.message || err });
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
    logger.logSuccess('Pie chart data retrieved');
    res.json({ message: 'SUCCESS', pieChartData });
  } catch (err) {
    logger.error('Cannot retrieve pie chart data:', err?.message || err);
    res.status(err?.status || Status.INTERNAL_SERVER_ERROR).json({ error: err?.message || err });
  }
};

const getAttempt = async (req, res) => {
  try {
    const { attemptId } = req.query;
    const attempt = await historyService.getAttempt(attemptId);
    logger.logSuccess('Attempt retrieved');
    res.json({ message: 'SUCCESS', attempt });
  } catch (err) {
    logger.error('Cannot retrieve attempt:', err?.message || err);
    res.status(err?.status || Status.INTERNAL_SERVER_ERROR).json({ error: err?.message || err });
  }
};

module.exports = {
  addAttempt,
  getAttempts,
  getHeatMapData,
  getPieChartData,
  getAttempt,
};
