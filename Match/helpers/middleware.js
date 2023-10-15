const authApi = require('./callsToAuth.js');

const checkToken = async (req, res, next) => {
  // Extract the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // Check if user has the right permissions (with auth api)
  try {
    await authApi.authorize(token);
    next();
  } catch (err) {
    res
      .status(err?.response?.status || 500)
      .json({ error: err?.response?.data?.error || err });
  }
};

module.exports = {
  checkToken,
};
