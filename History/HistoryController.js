const historyService = require('./HistoryService.js');

const addAttempt = async (req, res) => {
  try {
    const { userId, questionId } = req.body;
    await historyService.addAttempt(userId, questionId);
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
    const { userId } = req.body;
    const attempts = await historyService.getAttempts(userId);
    res.json({ message: 'SUCCESS', attempts });
  } catch (err) {
    res.status(err?.status || 400).json({ error: err?.message || err });
  }
};


module.exports = {
  addAttempt,
  deleteUserAttempts,
  getAttempts,
};
