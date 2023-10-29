const queueService = require('./services/producerService');
const { Status } = require('./constants');

const joinQueue = async (req, res) => {
  try {
    const { jwt, queueName, sessionID } = req.body;
    const response = await queueService.joinQueue(jwt, queueName, sessionID);
    res.json({ message: 'Joined queue successfully', response });
  } catch (err) {
    res
      .status(err?.status || Status.INTERNAL_SERVER_ERROR)
      .json({ error: err?.message || err });
  }
};

const exitQueue = async (req, res) => {
  try {
    const { jwt, queueName, sessionID } = req.body;
    await queueService.exitQueue(jwt, queueName, sessionID);
    res.json({ message: 'Exited queue successfully' });
  } catch (err) {
    res
      .status(err?.status || Status.INTERNAL_SERVER_ERROR)
      .json({ error: err?.message || err });
  }
};

module.exports = {
  joinQueue,
  exitQueue,
};