const jwt = require('jsonwebtoken');
const env = require('./loadEnvironment');
const { getJwtToken } = require('./helpers/jwt');
const { Status } = require('./constants');
const logger = require('./Log');

// Used by login requests
exports.generate = async (req, res) => {
  try {
    const userInfo = req.body;
    if (Object.keys(userInfo).join(',') == ['isMaintainer', 'id'].join(',')) {
      const jwtToken = getJwtToken(userInfo);
      logger.logSuccess('Generated JWT');
      res.json({ message: 'Generated JWT successfully', token: jwtToken });
    } else {
      logger.log('Invalid user information provided, cannot generate JWT');
      return res
        .status(Status.BAD_REQUEST)
        .json({ error: 'Invalid user information provided' });
    }
  } catch (err) {
    logger.error('Cannot generate JWT', err?.message || err);
    res
      .status(err?.status || Status.BAD_REQUEST)
      .json({ error: err?.message || err });
  }
};

// Used to check if user is authorized by checking the validity of their JWT token
exports.authorize = async (req, res) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // No JWT token found
    if (token === 'undefined') {
      logger.warn('Not Authorized (No JWT token found)');
      return res
        .status(Status.UNAUTHORIZED)
        .json({ error: 'No JWT token found' });
    }

    // Verify and decode jwtToken
    jwt.verify(token, env.JWT_SECRET_KEY, (err, decodedJwtToken) => {
      if (err) {
        logger.warn('Not Authorized (Invalid JWT token)');
        return res
          .status(Status.UNAUTHORIZED)
          .json({ error: 'Invalid JWT token' });
      }
      // Return userId and isMaintainer to user to use at frontend
      const userInfo = {
        userId: decodedJwtToken.userId,
        isMaintainer: decodedJwtToken.isMaintainer,
      };
      logger.logSuccess('Authorized (User logged in)');
      res.json({ message: 'User is authorized', userInfo: userInfo });
    });
  } catch (err) {
    logger.error('Cannot authorize user', err?.message || err);
    res
      .status(err?.status || Status.INTERNAL_SERVER_ERROR)
      .json({ error: err?.message || err });
  }
};

// Used to check if user is an authorized maintainer by checking the validity of their JWT token and isMaintainer value
exports.authorizeMaintainer = async (req, res) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // No JWT token found
    if (token === 'undefined') {
      logger.log('Not Authorized (No JWT token found)');
      return res
        .status(Status.UNAUTHORIZED)
        .json({ error: 'No JWT token found' });
    }

    // Verify and decode jwtToken
    jwt.verify(token, env.JWT_SECRET_KEY, (err, decodedJwtToken) => {
      if (err) {
        logger.log('Not Authorized (Invalid JWT token)');
        return res
          .status(Status.UNAUTHORIZED)
          .json({ error: 'Invalid JWT token' });
      }

      if (decodedJwtToken.isMaintainer !== true) {
        logger.warn('Not Authorized (User not maintainer)');
        return res
          .status(Status.UNAUTHORIZED)
          .json({ error: 'Not Maintainer' });
      }

      // Return userId and isMaintainer to user to use at frontend
      const userInfo = {
        userId: decodedJwtToken.userId,
        isMaintainer: decodedJwtToken.isMaintainer,
      };
      logger.logSuccess('Authorized (User is maintainer)');
      res.json({
        message: 'User is an authorized maintainer',
        userInfo: userInfo,
      });
    });
  } catch (err) {
    logger.error('Cannot authorize maintainer', err?.message || err);
    res
      .status(err?.status || Status.INTERNAL_SERVER_ERROR)
      .json({ error: err?.message || err });
  }
};
