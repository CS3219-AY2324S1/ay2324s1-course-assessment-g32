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
    logger.logFailure('Cannot login:', err?.message || err);
    res.status(err?.status || 400).json({ error: err?.message || err });
  }
};

const signup = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    await userService.createUser(email, password, confirmPassword);
    res.json({ message: 'User registered successfully' });
    logger.logSuccess('Registered new user', email);
  } catch (err) {
    logger.logFailure('Cannot signup new user:', err?.message || err);
    res.status(err?.status || 500).json({ error: err?.message || err });
    
  }
};

const getAllUserInfo = async (req, res) => {
  try {
    const info = await userService.getAllUserInfo();
    logger.logSuccess('Retrieved all user info');
    res.json({ message: 'SUCCESS', info });
  } catch (err) {
    logger.logFailure('Cannot retrieve all user info:', err?.message || err);
    res.status(err?.status || 400).json({ error: err?.message || err });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const { id, email } = req.query;
    const info = await userService.getUserInfo(id, email);
    logger.logSuccess('Retrieved user info for', id ? 'user ' + id: email);
    res.json({ message: 'SUCCESS', info });
  } catch (err) {
    logger.logFailure('Cannot retrieve user info:', err?.message || err);
    res.status(err?.status || 400).json({ error: err?.message || err });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id, displayName } = req.body;
    await userService.updateUser(id, displayName);
    logger.logSuccess('User', id, 'has updated username to', displayName);
    res.json({ message: 'SUCCESS: User info updated' });
  } catch (err) {
    logger.logFailure('Cannot update username of user:', err?.message || err);
    res.status(err?.status || 400).json({ error: err?.message || err });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.query;
    await userService.deleteUser(id);
    logger.logSuccess('User', id, 'deleted');
    res.json({ message: 'SUCCESS: User deleted' });
  } catch (err) {
    logger.logFailure('Cannot delete user:', err?.message || err);
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
    logger.logSuccess('Changed password for user', id);
    res.json({ message: 'SUCCESS: Password changed' });
  } catch (err) {
    logger.logFailure('Cannot change password:', err?.message || err);
    res.status(err?.status || 400).json({ error: err?.message || err });
  }
};

const toggleUserRole = async (req, res) => {
  try {
    const { id } = req.body;
    await userService.toggleUserRole(id);
    logger.logSuccess('Toggled user role for user', id);
    res.json({ message: 'SUCCESS: User role toggled' });
  } catch (err) {
    logger.logFailure('Cannot toggle user role:', err?.message || err);
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
  toggleUserRole,
};
