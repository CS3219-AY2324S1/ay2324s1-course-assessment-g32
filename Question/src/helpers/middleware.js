const authApi = require('./callsToAuth');
const { Status } = require('../constants');

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
      .status(err?.response?.status || Status.INTERNAL_SERVER_ERROR)
      .json({ error: err?.response?.data?.error || err });
  }
};

const checkTokenMaintainer = async (req, res, next) => {
  // Extract the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // Check if user has the right permissions (with auth api)
  try {
    await authApi.authorizeMaintainer(token);
    next();
  } catch (err) {
    res
      .status(err?.response?.status || Status.INTERNAL_SERVER_ERROR)
      .json({ error: err?.response?.data?.error || err });
  }
};

module.exports = {
  checkToken,
  checkTokenMaintainer,
};
