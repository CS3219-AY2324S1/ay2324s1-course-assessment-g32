const userService = require('./UserService.js');
const logger = require('./Log.js');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userInfo = await userService.loginUser(email, password);
    req.userInfo = userInfo;
    logger.logSuccess('user(' + email + ') is logged in');
    next();
  } catch (err) {
    res.status(err?.status || 400).json({ error: err?.message || err });
    logger.logFailure('Cannot login:', err?.message || err);
  }
};

const signup = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    await userService.createUser(email, password, confirmPassword);
    res.json({ message: 'User registered successfully' });
    logger.logSuccess('Registered new user', email);
  } catch (err) {
    res.status(err?.status || 500).json({ error: err?.message || err });
    logger.logFailure('Cannot signup new user:', err?.message || err);
  }
};

const getAllUserInfo = async (req, res) => {
  try {
    const info = await userService.getAllUserInfo();
    res.json({ message: 'SUCCESS', info });
    logger.logSuccess('Retrieved all user info');
  } catch (err) {
    res.status(err?.status || 400).json({ error: err?.message || err });
    logger.logFailure('Cannot retrieve all user info:', err?.message || err);
  }
};

const getUserInfo = async (req, res) => {
  try {
    const { id, email } = req.body;
    const info = await userService.getUserInfo(id, email);
    res.json({ message: 'SUCCESS', info });
    logger.logSuccess('Retrieved user info for', id ? 'user ' + id: email);
  } catch (err) {
    res.status(err?.status || 400).json({ error: err?.message || err });
    logger.logFailure('Cannot retrieve user info:', err?.message || err);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id, username } = req.body;
    await userService.updateUser(id, username);
    res.json({ message: 'SUCCESS: User info updated' });
    logger.logSuccess('User', id, 'has updated username to', username);
  } catch (err) {
    res.status(err?.status || 400).json({ error: err?.message || err });
    logger.logFailure('Cannot update username of user:', err?.message || err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    await userService.deleteUser(id);
    res.json({ message: 'SUCCESS: User deleted' });
    logger.logSuccess('User', id, 'deleted');
  } catch (err) {
    res.status(err?.status || 400).json({ error: err?.message || err });
    logger.logFailure('Cannot delete user:', err?.message || err);
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
    logger.logSuccess('Changed password for user', id);
  } catch (err) {
    res.status(err?.status || 400).json({ error: err?.message || err });
    logger.logFailure('Cannot change password:', err?.message || err);
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
