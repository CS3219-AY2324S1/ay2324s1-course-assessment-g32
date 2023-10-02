const authorisationService = require('../services/authorisationService');

// Define a controller function for creating questions
const isMaintainer = async (req, res) => {
  try {
    const { jwtToken } = req.query;
    const isMaintainer = await authorisationService.isMaintainer(jwtToken);
    res.json({ isMaintainer });
  } catch (err) {
    res
      .status(err?.status || 500)
      .json({ error: err?.message || err });
  }
};

module.exports = {
  isMaintainer,
};
