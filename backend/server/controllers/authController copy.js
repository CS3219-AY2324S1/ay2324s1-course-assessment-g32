const userService = require('../services/userService');

// Define a controller function for handling login requests
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.loginUser(email, password);
    res.json({ message: 'User logged in successfully', id: user });
  } catch (err) {
    res
      .status(err?.status || 400)
      .json({ error: err?.message || err });
  }
};

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

module.exports = {
  login,
  signup
};
