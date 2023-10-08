const userService = require('../services/userService');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userInfo = await userService.loginUser(email, password);
    req.userInfo = userInfo;
    next();
  } catch (err) {
    res.status(err?.status || 400).json({ error: err?.message || err });
  }
};

const signup = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    await userService.createUser(email, password, confirmPassword);
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(err?.status || 500).json({ error: err?.message || err });
  }
};

const getAllUserInfo = async (req, res) => {
  try {
    const info = await userService.getAllUserInfo();
    res.json({ message: 'SUCCESS', info });
  } catch (err) {
    res.status(err?.status || 400).json({ error: err?.message || err });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const { id, email } = req.body;
    const info = await userService.getUserInfo(id, email);
    res.json({ message: 'SUCCESS', info });
  } catch (err) {
    res.status(err?.status || 400).json({ error: err?.message || err });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id, username } = req.body;
    await userService.updateUser(id, username);
    res.json({ message: 'SUCCESS: User info updated' });
  } catch (err) {
    res.status(err?.status || 400).json({ error: err?.message || err });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    await userService.deleteUser(id);
    res.json({ message: 'SUCCESS: User deleted' });
  } catch (err) {
    res.status(err?.status || 400).json({ error: err?.message || err });
  }
};

const changePassword = async (req, res) => {
  try {
    const { id, currentPassword, newPassword, confirmPassword } = req.body;
    await userService.changeUserPassword(
      id,
      currentPassword,
      newPassword,
      confirmPassword
    );
    res.json({ message: 'SUCCESS: Password changed' });
  } catch (err) {
    res.status(err?.status || 400).json({ error: err?.message || err });
  }
};

module.exports = {
  signup,
  login,
  getAllUserInfo,
  getUserInfo,
  updateUser,
  deleteUser,
  changePassword,
};
