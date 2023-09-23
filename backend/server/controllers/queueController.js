const QueueService = require('../services/queueService');
const queueService = new QueueService();

const joinQueue = async (req, res) => {
  try {
    const { complexityType, id } = req.body;
    queueService.joinQueue(complexityType, id).then((response) => {
      res.json({ message: 'Joined queue successfully', response })
    });
  } catch (err) {
    res
      .status(err?.status || 500)
      .json({ error: err?.message || err });
  }
};

module.exports = {
  joinQueue
};
