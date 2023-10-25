const express = require('express');
const router = express.Router();

const userController = require('./UserController.js');
const middleware = require('./helpers/middleware.js');

// Get JWT token after logging in
router.post('/login', userController.login, middleware.getToken);

// Only maintainer can access these routes
router.get(
  '/read-all',
  middleware.checkTokenMaintainer,
  userController.getAllUserInfo
);
router.put(
  '/toggle-user-role',
  middleware.checkTokenMaintainer,
  userController.toggleUserRole
);

// User and maintainer can access the remaining routes
router.get('/read', middleware.checkToken, userController.getUserInfo);
router.put('/update', middleware.checkToken, userController.updateUser);
router.delete('/delete', middleware.checkToken, userController.deleteUser);
router.put(
  '/change-password',
  middleware.checkToken,
  userController.changePassword
);

// No middleware function
router.post('/signup', userController.signup);

module.exports = router;
