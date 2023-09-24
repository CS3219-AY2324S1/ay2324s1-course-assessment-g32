const queueService = require('../services/queueService');

const joinQueue = async (req, res) => {
  try {
    const { id, complexityType } = req.body;
    const response = await queueService.joinQueue(id, complexityType);
    res.json({ message: 'Joined queue successfully', response });
  } catch (err) {
    res
      .status(err?.status || 500)
      .json({ error: err?.message || err });
  }
};

const exitQueue = async (req, res) => {
  try {
    const { id, complexityType } = req.body;
    await queueService.exitQueue(id, complexityType);
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
