const decode = require('jwt-decode');
const jwt = require('jsonwebtoken');

const generateJwtToken = (userInfo) => {
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

const isMaintainer = (token) => {
  if (!token) {
    return false;
  }

  // TODO: Replace JWT_SECRET with a proper secret key (process.env.JWT_SECRET?)
  const decodedToken = decode(token, 'password');
  if (decodedToken) {
    return decodedToken.isMaintainer !== 1 ? false : true;
  } else {
    return false;
  }
};

const isAuthorised = (token) => {

  // TODO: Replace JWT_SECRET with a proper secret key (process.env.JWT_SECRET?)
  if (!token || !decode(token, 'password')) {
    return false;
  } else {
    return true;
  }
};

module.exports = {
  generateJwtToken,
  isMaintainer,
  isAuthorised,
};
