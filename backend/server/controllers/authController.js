const userService = require('../services/userService');

// Define a controller function for handling signup requests
const signup = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    await userService.createUser(email, password, confirmPassword);

    res.json({ message: 'User registered successfully' });
  } catch (err) {
    res
      .status(err?.status || 500)
      .json({ error: err?.message || err });
  }
};

// TODO: test code
// Define a controller function for handling login requests
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.loginUser(email, password);
    // TODO: Add authentication and token generation logic here

    res.json({ message: 'User logged in successfully', user });
  } catch (err) {
    res
      .status(err?.status || 400)
      .json({ error: err?.message || err });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const { id, email } = req.body;
    const info = await userService.getUserInfo(id, email);
    res.json({ info });
  } catch (err) {
    res
      .status(err?.status || 400)
      .json({ error: err?.message || err });
  }
};

module.exports = {
  signup,
  login,

  // Still in testing
  getUserInfo,
};
