const { getJwtToken } = require('./helpers/jwt.js');
const jwt = require('jsonwebtoken');
const env = require('./loadEnvironment.js');
const logger = require('./Log.js');

// Used by login requests
const generate = async (req, res) => {
  try {
    const userInfo = req.body;
    if (
      Object.keys(userInfo).join(',') == ['userId', 'isMaintainer'].join(',')
    ) {
      const jwtToken = getJwtToken(userInfo);
      logger.logSuccess('Generated JWT');
      res.json({ message: 'Generated JWT successfully', token: jwtToken });
      
    } else {
      logger.log('Invalid user information provided, cannot generate JWT');
      return res
        .status(400)
        .json({ error: 'Invalid user information provided' });
    }
  } catch (err) {
    logger.error('Cannot generate JWT', err?.message || err);
    res.status(err?.status || 400).json({ error: err?.message || err });
  }
};

// Used to check if user is authorized by checking the validity of their JWT token
const authorize = async (req, res) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // No JWT token found
    if (token === 'undefined') {
      logger.warn('Not Authorized (No JWT token found)');
      return res.status(401).json({ error: 'No JWT token found' });
    }

    // Verify and decode jwtToken
    jwt.verify(token, env.JWT_SECRET_KEY, (err, decodedJwtToken) => {
      if (err) {
        logger.warn('Not Authorized (Invalid JWT token)');
        return res.status(401).json({ error: 'Invalid JWT token' });
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
    res.status(err?.status || 500).json({ error: err?.message || err });
  }
};

// Used to check if user is an authorized maintainer by checking the validity of their JWT token and isMaintainer value
const authorizeMaintainer = async (req, res) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // No JWT token found
    if (token === 'undefined') {
      logger.log('Not Authorized (No JWT token found)');
      return res.status(401).json({ error: 'No JWT token found' });
    }

    // Verify and decode jwtToken
    jwt.verify(token, env.JWT_SECRET_KEY, (err, decodedJwtToken) => {
      if (err) {
        logger.log('Not Authorized (Invalid JWT token)');
        return res.status(401).json({ error: 'Invalid JWT token' });
      }

      if (!decodedJwtToken.isMaintainer) {
        logger.warn('Not Authorized (User not maintainer)');
        return res.status(401).json({ error: 'Not Maintainer' });
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
    res.status(err?.status || 500).json({ error: err?.message || err });
  }
};

module.exports = {
  generate,
  authorize,
  authorizeMaintainer,
};
