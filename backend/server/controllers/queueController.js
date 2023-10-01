const queueService = require('../services/queueService');

const joinQueue = async (req, res) => {
  try {
    const { id, queueName, sessionID } = req.body;
    const response = await queueService.joinQueue(id, queueName, sessionID);
    res.json({ message: 'Joined queue successfully', response });
  } catch (err) {
    res
      .status(err?.status || 500)
      .json({ error: err?.message || err });
  }
};

const exitQueue = async (req, res) => {
  try {
    const { id, queueName, sessionID } = req.body;
    await queueService.exitQueue(id, queueName, sessionID);
    res.json({ message: 'Exited queue successfully' });
  } catch (err) {
    res
      .status(err?.status || 500)
      .json({ error: err?.message || err });
  }
};

module.exports = {
  joinQueue,
  exitQueue
};
