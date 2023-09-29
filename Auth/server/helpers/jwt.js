const jwt = require('jsonwebtoken');
const env = require('../../loadEnvironment.js');

const getJwtToken = (userInfo) => {
  const payload = {
    userId: userInfo._userId,
    isMaintainer: userInfo._isMaintainer,
  };

  // Issue JWT
  return jwt.sign(payload, env.JWT_SECRET_KEY, {
    expiresIn: '1h',
  });
};

module.exports = {
  getJwtToken,
};
