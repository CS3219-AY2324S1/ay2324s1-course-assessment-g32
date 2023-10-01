const userService = require('../services/userService');

const createUser = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    await userService.createUser(email, password, confirmPassword);
    res.status(200).json({ message: 'SUCCESS: User created' });
  } catch (err) {
    res.status(err?.status || 500).json({ error: err?.message || err });
  }
};

const getAllUserInfo = async (req, res) => {
  try {
    const info = await userService.getAllUserInfo();
    res.status(200).json({ info });
  } catch (err) {
    res.status(err?.status || 400).json({ error: err?.message || err });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const { id, email } = req.body;
    const info = await userService.getUserInfo(id, email);
    res.status(200).json({ info });
  } catch (err) {
    res.status(err?.status || 400).json({ error: err?.message || err });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id, username, password } = req.body;
    await userService.updateUser(id, username, password);
    res.status(200).json({ message: 'SUCCESS: User info updated' });
  } catch (err) {
    res.status(err?.status || 400).json({ error: err?.message || err });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    await userService.deleteUser(id);
    res.status(200).json({ message: 'SUCCESS: User deleted' });
  } catch (err) {
    res.status(err?.status || 400).json({ error: err?.message || err });
  }
};

const changePassword = async (req, res) => {
  try {
    const { id, currentPassword, newPassword, confirmPassword } = req.body;
    await userService.changeUserPassword(id, currentPassword, newPassword, confirmPassword);
    res.status(200).json({ message: 'SUCCESS: Password changed' });
  } catch (err) {
    res.status(err?.status || 400).json({ error: err?.message || err });
  }
};

module.exports = {
  createUser,
  getAllUserInfo,
  getUserInfo,
  updateUser,
  deleteUser,
  changePassword
};
