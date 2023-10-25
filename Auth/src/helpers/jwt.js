const jwt = require('jsonwebtoken');
const env = require('../loadEnvironment');
const { JWT } = require('../constants');

const getJwtToken = (userInfo) => {
  const payload = {
    userId: userInfo.userId,
    isMaintainer: userInfo.isMaintainer,
  };

  // Issue JWT
  return jwt.sign(payload, env.JWT_SECRET_KEY, { algorithm: JWT.ALGORITHM });
};

module.exports = {
  getJwtToken,
};
