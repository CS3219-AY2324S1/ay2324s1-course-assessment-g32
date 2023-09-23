const queueService = require('../services/queueService');

const joinQueue = async (req, res) => {
  try {
    const { complexityType, id } = req.body;
    const response = await queueService.joinQueue(complexityType, id);
    res.json({ message: 'Joined queue successfully', response })
  } catch (err) {
    res
      .status(err?.status || 500)
      .json({ error: err?.message || err });
  }
};

module.exports = {
  joinQueue
};
