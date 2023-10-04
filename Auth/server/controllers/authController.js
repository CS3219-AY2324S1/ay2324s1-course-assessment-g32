const { getJwtToken } = require('../helpers/jwt.js');
const jwt = require('jsonwebtoken');
const env = require('../../loadEnvironment.js');

// Define a controller function for handling login requests
const generate = async (req, res) => {
  try {
    const { email, isMaintainer } = req.body;

    const tokenData = {
      email: email,
      isMaintainer: isMaintainer,
    }
    
    const jwtToken = getJwtToken(tokenData);
    res.json({ message: 'Generated JWT successfully', token: jwtToken });
  } catch (err) {
    res.status(err?.status || 400).json({ error: err?.message || err });
  }
};

const authorize = async (req, res) => {
  try {
    let isMaintainer = null;

    // Extract the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // No JWT token found
    if (token == null) {
      return res.status(401).json({ error: 'No JWT token found' });
    }

    // Verify and decode jwtToken
    jwt.verify(token, env.JWT_SECRET_KEY, (err, decodedJwtToken) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid JWT token' });
      }

      // decodedJwtToken contains { userId, isMaintainer, iat, exp }
      isMaintainer = decodedJwtToken['isMaintainer'];

      res.json({ message: 'User is authorized' });
    });
  } catch (err) {
    // throw Object.assign(new Error('Incorrect password'), { status: 401 });
    res.status(err?.status || 500).json({ error: err?.message || err });
  }
};

const authorizeMaintainer = async (req, res) => {
  try {
    let isMaintainer = null;

    // Extract the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // No JWT token found
    if (token == null) {
      return res.status(401).json({ error: 'No JWT token found' });
    }

    // Verify and decode jwtToken
    jwt.verify(token, env.JWT_SECRET_KEY, (err, decodedJwtToken) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid JWT token' });
      }

      // decodedJwtToken contains { userId, isMaintainer, iat, exp }
      isMaintainer = decodedJwtToken['isMaintainer'];

      if (!isMaintainer) {
        return res.status(401).json({ error: 'Not Maintainer' });
      }

      res.json({ message: 'User is authorized' });
    });
  } catch (err) {
    // throw Object.assign(new Error('Incorrect password'), { status: 401 });
    res.status(err?.status || 500).json({ error: err?.message || err });
  }
};

module.exports = {
  generate,
  authorize,
  authorizeMaintainer,
};
