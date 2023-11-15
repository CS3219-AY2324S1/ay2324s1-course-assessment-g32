const historyService = require('./HistoryService');
const questionApi = require('./helpers/callsToQuestion');
const { Status } = require('./constants');
const logger = require('./Log');

exports.addAttempt = async (req, res) => {
  const { userId, questionId, code, language, result } = req.body;
  try {
    await historyService.addAttempt(userId, questionId, code, language, result);
    logger.logSuccess(`Added attempt for user ${userId}`);
    res.json({ message: 'Submitted Attempt!' });
  } catch (err) {
    logger.error(`Cannot add attempt for ${userId}: `, err?.message || err);
    res.status(err?.status || Status.INTERNAL_SERVER_ERROR).json({ error: err?.message || err });
  }
};

exports.getAttempts = async (req, res) => {
  const { userId, questionId } = req.query;
  try {
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
    logger.logSuccess(`Attempts retrieved for user ${userId}`);
  } catch (err) {
    logger.error(`Cannot retrieve attempts for ${userId}: `, err?.message || err);
    res.status(err?.status || Status.INTERNAL_SERVER_ERROR).json({ error: err?.message || err });
  }
};

exports.getAttempt = async (req, res) => {
  const { attemptId } = req.query;
  try {
    const attempt = await historyService.getAttempt(attemptId);
    logger.logSuccess(`Retrieved attempt details for attempt ${attemptId}`);
    res.json({ message: 'SUCCESS', attempt });
  } catch (err) {
    logger.error(`Cannot retrieve ${attemptId} attempt: `, err?.message || err);
    res.status(err?.status || Status.INTERNAL_SERVER_ERROR).json({ error: err?.message || err });
  }
};

exports.getHeatMapData = async (req, res) => {
  const { userId } = req.query;
  try {
    const heatMapData = await historyService.getHeatMapData(userId);
    logger.logSuccess(`Retrieved heatmap data for user ${userId}`);
    res.json({ message: 'SUCCESS', heatMapData });
  } catch (err) {
    logger.error(`Cannot retrieve heatmap data for ${userId}: `, err?.message || err);
    res.status(err?.status || Status.INTERNAL_SERVER_ERROR).json({ error: err?.message || err });
  }
};

exports.getPieChartData = async (req, res) => {
  const { userId } = req.query;
  try {
    const jwtToken = req.headers['authorization'];
    const attemptedQuestionsId = await historyService.getAttemptedQuestionsId(userId);
    const attemptedQuestionsStats = await questionApi.getQuestionDifficultyCount(jwtToken, attemptedQuestionsId);
    const allQuestionsStats = await questionApi.getQuestionStatistics(jwtToken);
    const unattemptedQuestionsStats = historyService.getUnattemptedQuestionsStats(
      attemptedQuestionsStats.data.questionCountByDifficulty,
      allQuestionsStats.data.questionStatistics);

    // Set pie char data
    const pieChartData = {
      attemptedQuestionsStats: attemptedQuestionsStats.data.questionCountByDifficulty,
      allQuestionsStats: allQuestionsStats.data.questionStatistics,
      unattemptedQuestionsStats: unattemptedQuestionsStats,
    };
    
    logger.logSuccess(`Retrieved pie chart data for user ${userId}`);
    res.json({ message: 'SUCCESS', pieChartData });
  } catch (err) {
    logger.error(`Cannot retrieve pie chart data for ${userId}: `, err?.message || err);
    res.status(err?.status || Status.INTERNAL_SERVER_ERROR).json({ error: err?.message || err });
  }
};
