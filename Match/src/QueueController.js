const queueService = require('./services/producerService');
const { Status } = require('./constants');
const logger = require('./Log');

const joinQueue = async (req, res) => {
  try {
    const { jwt, queueName, sessionID } = req.body;
    const response = await queueService.joinQueue(jwt, queueName, sessionID);
    logger.logSuccess('Joined queue successfully');
    res.json({ message: 'Joined queue successfully', response });
  } catch (err) {
    logger.logFailure('Cannot join queue:', err?.message || err);
    res
      .status(err?.status || Status.INTERNAL_SERVER_ERROR)
      .json({ error: err?.message || err });
  }
};

const exitQueue = async (req, res) => {
  try {
    const { jwt, queueName, sessionID } = req.body;
    await queueService.exitQueue(jwt, queueName, sessionID);
    logger.logSuccess('Exited queue successfully');
    res.json({ message: 'Exited queue successfully' });
  } catch (err) {
    logger.logFailure('Cannot exit queue:', err?.message || err);
    res
      .status(err?.status || Status.INTERNAL_SERVER_ERROR)
      .json({ error: err?.message || err });
  }
};

module.exports = {
  joinQueue,
  exitQueue,
};
