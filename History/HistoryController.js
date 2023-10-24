const historyService = require('./HistoryService.js');
const questionApi = require('./helpers/callsToQuestion.js');

const addAttempt = async (req, res) => {
  try {
    const { userId, questionId, code } = req.body;
    await historyService.addAttempt(userId, questionId, code);
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
    const jwtToken = req.headers['authorization'];
    const { userId } = req.query;
    const attempts = await historyService.getAttempts(userId);
    const questionResponse = await questionApi.appendQuestionTitle(jwtToken, attempts);
    const attemptsWithTitles = questionResponse.data.attemptsWithTitles;
    res.json({ message: 'SUCCESS', attemptsWithTitles });
  } catch (err) {
    res.status(err?.status || 400).json({ error: err?.message || err });
  }
};

module.exports = {
  addAttempt,
  deleteUserAttempts,
  getAttempts,
};
