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

const deleteAttempt = async (req, res) => {
  try {
    const { userId, questionId } = req.body;
    await historyService.deleteAttempt(userId, questionId);
    res.json({ message: 'SUCCESS: History attempt deleted' });
  } catch (err) {
    res.status(err?.status || 400).json({ error: err?.message || err });
  }
};


module.exports = {
  addAttempt,
  deleteAttempt,
};
