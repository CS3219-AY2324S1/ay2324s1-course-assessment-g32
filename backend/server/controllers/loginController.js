const userService = require('../services/userService');

// Define a controller function for handling user login requests
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userService.loginUser(email, password);
    // TODO: Add authentication and token generation logic here

    // Send a success response with user's data or token
    res.json({ user });
  } catch (err) {
    res
      .status(err?.status || 400)
      .json({ error: err?.message || err });
  }
};

module.exports = {
  loginUser
};
