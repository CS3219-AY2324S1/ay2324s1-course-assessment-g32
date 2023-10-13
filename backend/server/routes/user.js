const express = require('express');
const router = express.Router();

const userController = require('../../../backend/server/controllers/userController.js');
const middleware = require('../middleware.js');

// Get JWT token after logging in
router.post('/login', userController.login, middleware.getToken);

// Only maintainer can access these routes
router.get(
  '/readAll',
  middleware.checkTokenMaintainer,
  userController.getAllUserInfo
);

// User and maintainer can access the remaining routes
router.post('/read', middleware.checkToken, userController.getUserInfo);
router.post('/update', middleware.checkToken, userController.updateUser);
router.post('/delete', middleware.checkToken, userController.deleteUser);
router.post(
  '/change-password',
  middleware.checkToken,
  userController.changePassword
);

// No middleware function
router.post('/signup', userController.signup);

module.exports = router;
