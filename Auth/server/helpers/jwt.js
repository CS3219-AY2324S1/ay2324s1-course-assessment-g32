const jwt = require('jsonwebtoken');

const getJwtToken = (userInfo) => {
  const payload = {
    userId: userInfo._userId,
    isMaintainer: userInfo._isMaintainer,
  };

  // TODO: Replace JWT_SECRET with a proper secret key (process.env.JWT_SECRET?)
  // Issue JWT
  return jwt.sign(payload, 'password', {
    expiresIn: '1h',
  });
};

module.exports = {
  getJwtToken,
};
