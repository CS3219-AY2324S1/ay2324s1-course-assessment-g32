const authService = require('../services/AuthService.js');
const { getJwtToken } = require('../helpers/jwt.js');
const jwt = require('jsonwebtoken');
const env = require('../../loadEnvironment.js');

// Define a controller function for handling login requests
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.loginUser(email, password);
    const jwtToken = getJwtToken(user);
    res.json({ message: 'User logged in successfully', token: jwtToken });
  } catch (err) {
    res.status(err?.status || 400).json({ error: err?.message || err });
  }
};

// Define a controller function for handling signup requests
const signup = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    await authService.createUser(email, password, confirmPassword);
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(err?.status || 500).json({ error: err?.message || err });
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

      // TODO: Either create a new api or change the message sent

      res.json({ message: 'User is authorized' });
    });
  } catch (err) {
    // throw Object.assign(new Error('Incorrect password'), { status: 401 });
    res.status(err?.status || 500).json({ error: err?.message || err });
  }
};

// const authenticate = async (req, res) => {
//   try {
//     const { id, curPassword } = req.body;
//     const authRes = await authService.authenticate(id, curPassword);
//     return authRes;
//   } catch (error) {
//     res.status(err?.status || 500).json({ error: err?.message || err });
//   }
// };

module.exports = {
  login,
  signup,
  authorize,
  // authenticate,
};
