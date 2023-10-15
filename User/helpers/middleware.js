const authApi = require('./callsToAuth.js');

const getToken = async (req, res) => {
  try {
    const authApiRes = await authApi.getToken(req.userInfo);
    res.json({
      message: 'Generated JWT successfully',
      token: authApiRes.data.token,
    });
  } catch (err) {
    res
      .status(err?.response?.status || 500)
      .json({ error: err?.response?.data?.error || err });
  }
};

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
      .status(err?.response?.status || 500)
      .json({ error: err?.response?.data?.error || err });
  }
};

module.exports = {
  getToken,
  checkToken,
  checkTokenMaintainer,
};
