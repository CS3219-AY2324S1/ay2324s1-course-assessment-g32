const jwt = require('jsonwebtoken');
const env = require('../loadEnvironment');
const { JWT_ALGORITHM } = require('../constants');

const getJwtToken = (userInfo) => {
  const payload = {
    userId: userInfo.userId,
    isMaintainer: userInfo.isMaintainer,
  };

  // Issue JWT
  return jwt.sign(payload, env.JWT_SECRET_KEY, { algorithm: JWT_ALGORITHM });
};

module.exports = {
  getJwtToken,
};
