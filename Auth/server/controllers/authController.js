const authService = require('../services/AuthService.js');
const { getJwtToken } = require('../helpers/jwt.js');

// Define a controller function for handling login requests
const login = async (req, res) => {
  try {
    console.log("in authcontroller");
    const { email, password, isMaintainer } = req.body;
    const user = await authService.loginUser(email, password, isMaintainer);
    const jwtToken = getJwtToken(user);
    res.json({ message: 'User logged in successfully', token: jwtToken });
  } catch (err) {
    res.status(err?.status || 400).json({ error: err?.message || err });
  }
};

// Define a controller function for handling signup requests
const signup = async (req, res) => {
  try {
    console.log("signing up in authController");
    const { email, password, confirmPassword } = req.body;
    await authService.createUser(email, password, confirmPassword);
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(err?.status || 500).json({ error: err?.message || err });
  }
};

const authenticate = async (req, res) => {
  try {
    const { id, curPassword } = req.body;
    const authRes = await authService.authenticate(id, curPassword);
    return authRes;
  } catch (error) {
    res.status(err?.status || 500).json({ error: err?.message || err });
  }
}

module.exports = {
  login,
  signup,
  authenticate,
};
