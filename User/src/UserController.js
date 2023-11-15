const userService = require('./UserService');
const { Status } = require('./constants');
const logger = require('./Log');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userInfo = await userService.loginUser(email, password);
    req.userInfo = userInfo;
    logger.logSuccess('user(' + email + ') is logged in');
    next();
  } catch (err) {
    logger.logFailure('Cannot login:', err?.message || err);
    res
      .status(err?.status || Status.BAD_REQUEST)
      .json({ error: err?.message || err });
  }
};

exports.signup = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    await userService.createUser(email, password, confirmPassword);
    res.json({ message: 'User registered successfully' });
    logger.logSuccess('Registered new user', email);
  } catch (err) {
    logger.logFailure('Cannot signup new user:', err?.message || err);
    res
      .status(err?.status || Status.INTERNAL_SERVER_ERROR)
      .json({ error: err?.message || err });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.query;
    await userService.deleteUser(id);
    logger.logSuccess('User', id, 'deleted');
    res.json({ message: 'SUCCESS: User deleted' });
  } catch (err) {
    logger.logFailure('Cannot delete user:', err?.message || err);
    res
      .status(err?.status || Status.BAD_REQUEST)
      .json({ error: err?.message || err });
  }
};

exports.getAllUserInfo = async (req, res) => {
  try {
    const info = await userService.getAllUserInfo();
    logger.logSuccess('Retrieved all user info');
    res.json({ message: 'SUCCESS', info });
  } catch (err) {
    logger.logFailure('Cannot retrieve all user info:', err?.message || err);
    res
      .status(err?.status || Status.BAD_REQUEST)
      .json({ error: err?.message || err });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const { id, email } = req.query;
    const info = await userService.getUserInfo(id, email);
    logger.logSuccess('Retrieved user info for', id ? 'user ' + id : email);
    res.json({ message: 'SUCCESS', info });
  } catch (err) {
    logger.logFailure('Cannot retrieve user info:', err?.message || err);
    res
      .status(err?.status || Status.BAD_REQUEST)
      .json({ error: err?.message || err });
  }
};

exports.updateDisplayName = async (req, res) => {
  try {
    const { id, displayName } = req.body;
    await userService.updateDisplayName(id, displayName);
    logger.logSuccess('User', id, 'has updated username to', displayName);
    res.json({ message: 'SUCCESS: User info updated' });
  } catch (err) {
    logger.logFailure('Cannot update username of user:', err?.message || err);
    res
      .status(err?.status || Status.BAD_REQUEST)
      .json({ error: err?.message || err });
  }
};

exports.updateProgrammingLanguage = async (req, res) => {
  try {
    const { id, programmingLanguage } = req.body;
    await userService.updateProgrammingLanguage(id, programmingLanguage);
    logger.logSuccess('User', id, 'has updated language to', programmingLanguage);
    res.json({ message: 'SUCCESS: User info updated' });
  } catch (err) {
    logger.logFailure('Cannot update programming language of user:', err?.message || err);
    res
      .status(err?.status || Status.BAD_REQUEST)
      .json({ error: err?.message || err });
  }
};

exports.updateComplexity = async (req, res) => {
  try {
    const { id, complexity } = req.body;
    await userService.updateComplexity(id, complexity);
    logger.logSuccess('User', id, 'has updated complexity to', complexity);
    res.json({ message: 'SUCCESS: User info updated' });
  } catch (err) {
    logger.logFailure('Cannot update complexity of user:', err?.message || err);
    res
      .status(err?.status || Status.BAD_REQUEST)
      .json({ error: err?.message || err });
  }
};

exports.changePassword = async (req, res) => {
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
    res
      .status(err?.status || Status.BAD_REQUEST)
      .json({ error: err?.message || err });
  }
};

exports.toggleUserRole = async (req, res) => {
  try {
    const { id } = req.body;
    await userService.toggleUserRole(id);
    logger.logSuccess('Toggled user role for user', id);
    res.json({ message: 'SUCCESS: User role toggled' });
  } catch (err) {
    logger.logFailure('Cannot toggle user role:', err?.message || err);
    res
      .status(err?.status || Status.BAD_REQUEST)
      .json({ error: err?.message || err });
  }
};
