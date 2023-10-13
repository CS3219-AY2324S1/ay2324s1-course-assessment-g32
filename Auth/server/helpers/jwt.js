const jwt = require('jsonwebtoken');
const env = require('../../loadEnvironment.js');

const getJwtToken = (userInfo) => {
  const payload = {
    userId: userInfo.userId,
    isMaintainer: userInfo.isMaintainer,
  };

  // Issue JWT
  return jwt.sign(payload, env.JWT_SECRET_KEY, { algorithm: 'HS256' });
};

module.exports = {
  getJwtToken,
};
