const userDatabase = require('../../../User/server/repository/userRepoMySql');
const bcrypt = require('bcrypt');

const verifyPassword = async (userId, givenPassword) => {
  const storedPassword = (await userDatabase.getUserInfoById(userId)).password;
  return bcrypt.compare(givenPassword, storedPassword);
};

const loginUser = async (email, password) => {
  try {
    let userInfo = new Object();

    // Check for missing inputs
    if (!email || !password) {
      throw Object.assign(new Error('Missing inputs'), { status: 400 });
    }

    // Check if email is valid
    var emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      throw Object.assign(new Error('Invalid email'), { status: 400 });
    }

    // Check if a user with the given email exists
    await userDatabase.findByEmail(email).then((info) => (userInfo = info));

    if (!userInfo.userId && !userInfo.isMaintainer) {
      throw Object.assign(new Error('Email not registered with any user'), {
        status: 410,
      });
    }

    // Compare the entered password with the hashed password stored in the database
    if (!(await verifyPassword(userInfo.userId, password))) {
      throw Object.assign(new Error('Incorrect password'), { status: 401 });
    }

    return userInfo;
  } catch (err) {
    throw err;
  }
};

const createUser = async (email, password, confirmPassword) => {
  try {
    let passExistingUserCheck = undefined;

    // Check for missing inputs
    if (!email || !password || !confirmPassword) {
      throw Object.assign(new Error('Missing inputs'), { status: 400 });
    }

    // Check if email is valid
    var emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      throw Object.assign(new Error('Invalid email'), { status: 400 });
    }

    // Check if a user with the given email already exists
    const existingUserCheck = userDatabase.findByEmail(email).then((userId) => {
      passExistingUserCheck = userId['userId'] === null;
    });

    // Check if the password is at least 8 characters long
    if (password.length < 8) {
      throw Object.assign(
        new Error('Password must be at least 8 characters long'),
        { status: 400 }
      );
    }

    // Check if the password and confirm password match
    if (password !== confirmPassword) {
      throw Object.assign(new Error('Passwords do not match'), { status: 400 });
    }

    // Check results of existingUserCheck
    await existingUserCheck;
    if (passExistingUserCheck === undefined) {
      console.error('No results from existingUserCheck');
    }
    if (!passExistingUserCheck) {
      throw Object.assign(new Error('User already exists'), { status: 409 });
    }

    // Create using with email and hashed password
    await userDatabase.createUser(email, bcrypt.hash(password, 10));
  } catch (err) {
    throw err;
  }
};

const getAllUserInfo = async () => {
  try {
    return userDatabase.getAllUserInfo();
  } catch (err) {
    throw err;
  }
};

const getUserInfo = async (userId, email) => {
  try {
    if (!userId && !email) {
      throw Object.assign(new Error('Need at least id or email'), {
        status: 400,
      });
    }

    if (userId != null) return userDatabase.getUserInfoById(userId);
    else return userDatabase.getUserInfoByEmail(email);
  } catch (err) {
    throw err;
  }
};

/**
 * Update user info of speficied userId.
 * Only supports changing of username and password.
 *
 * @param {int|string} userId ID of user in DB. Read-only.
 * @param {string} username New Username
 */
const updateUser = async (userId, username) => {
  try {
    if (!userId) {
      throw Object.assign(new Error('Missing userId'), { status: 400 });
    }

    if (!username) {
      throw Object.assign(new Error('WARN: Nothing given, not doing update'), {
        status: 400,
      });
    }

    return userDatabase.updateUser(userId, username);
  } catch (err) {
    throw err;
  }
};

const deleteUser = async (id) => {
  try {
    let _success = Boolean();

    // Check for missing inputs
    if (!id) {
      throw Object.assign(new Error('Missing id'), { status: 400 });
    }

    await userDatabase.deleteUser(id).then((x) => (_success = x));

    if (!_success) {
      throw Object.assign(
        new Error('Failed to delete user. Does user exists?'),
        { status: 500 }
      );
    }
  } catch (err) {
    throw err;
  }
};

/**
 * Changes password of user. Throws error if invalid parameters.
 * @param {string | number} id User ID
 * @param {string} curPassword Current Password
 * @param {string} newPassword New Password
 * @param {string} confirmPassword Confirm New Password
 */
const changeUserPassword = async (
  id,
  curPassword,
  newPassword,
  confirmPassword
) => {
  try {
    let _correctPassword = Boolean();

    // Check for missing inputs
    if (!id || !curPassword || !newPassword || !confirmPassword) {
      throw Object.assign(new Error('Missing inputs'), { status: 400 });
    }

    const passwordTest = verifyPassword(id, curPassword).then(
      (x) => (_correctPassword = x)
    );

    // Check that new password is not old password
    if (curPassword === newPassword) {
      throw Object.assign(new Error('New password cannot be old password'), {
        status: 400,
      });
    }

    // Confirm no typo in new password
    if (newPassword !== confirmPassword) {
      throw Object.assign(new Error('Confirm password not matching'), {
        status: 400,
      });
    }

    // Check if the password is at least 8 characters long
    if (newPassword.length < 8 || confirmPassword.length < 8) {
      throw Object.assign(
        new Error('Password must be at least 8 characters long'),
        { status: 400 }
      );
    }

    // Verify current password is correct
    await passwordTest;
    if (!_correctPassword) {
      throw Object.assign(new Error('Incorrect password'), { status: 401 });
    }

    const password = bcrypt.hashSync(newPassword, 10);
    if (!userDatabase.updatePassword(id, password)) {
      throw Object.assign(new Error('Failed to update password'), {
        status: 500,
      });
    }
  } catch (err) {
    throw err;
  }
};

module.exports = {
  loginUser,
  createUser,
  getAllUserInfo, // Read
  getUserInfo, // Read
  updateUser, // Update
  deleteUser, // Delete
  changeUserPassword, // Update
};