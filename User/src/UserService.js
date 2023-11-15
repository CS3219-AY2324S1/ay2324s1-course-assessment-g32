const bcrypt = require('bcrypt');
const userDatabase = require('./UserRepository');
const {
  Status,
  EMAIL_REGEX,
  MIN_PASSWORD_LENGTH,
  BCRYPT_SALT_ROUNDS,
} = require('./constants');

exports.createUser = async (email, password, confirmPassword) => {
  try {
    let passExistingUserCheck = undefined;

    // Check for missing inputs
    if (!email || !password || !confirmPassword) {
      throw Object.assign(new Error('Missing inputs'), {
        status: Status.BAD_REQUEST,
      });
    }

    // Check if email is valid
    if (!EMAIL_REGEX.test(email)) {
      throw Object.assign(new Error('Invalid email'), {
        status: Status.BAD_REQUEST,
      });
    }

    // Check if a user with the given email already exists
    const existingUserCheck = userDatabase
      .findByEmail(email)
      .then((userInfo) => {
        passExistingUserCheck = userInfo === null;
      });

    // Check if the password is at least 8 characters long
    if (password.length < MIN_PASSWORD_LENGTH) {
      throw Object.assign(
        new Error('Password must be at least 8 characters long'),
        { status: Status.BAD_REQUEST }
      );
    }

    // Check if the password and confirm password match
    if (password !== confirmPassword) {
      throw Object.assign(new Error('Passwords do not match'), {
        status: Status.BAD_REQUEST,
      });
    }

    // Check results of existingUserCheck
    await existingUserCheck;
    if (passExistingUserCheck) {
      console.error('No results from existingUserCheck');
    } else {
      throw Object.assign(new Error('User already exists'), {
        status: Status.CONFLICT,
      });
    }

    // Create using with email and hashed password
    await userDatabase.createUser(
      email,
      bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
    );
  } catch (err) {
    throw err;
  }
};

exports.deleteUser = async (id) => {
  try {
    let _success = Boolean();

    // Check for missing inputs
    if (!id) {
      throw Object.assign(new Error('Missing id'), {
        status: Status.BAD_REQUEST,
      });
    }

    await userDatabase.deleteUser(id).then((x) => (_success = x));

    if (!_success) {
      throw Object.assign(
        new Error('Failed to delete user. Does user exists?'),
        { status: Status.INTERNAL_SERVER_ERROR }
      );
    }
  } catch (err) {
    throw err;
  }
};

exports.loginUser = async (email, password) => {
  try {
    let userInfo = new Object();

    // Check for missing inputs
    if (!email || !password) {
      throw Object.assign(new Error('Missing inputs'), {
        status: Status.BAD_REQUEST,
      });
    }

    // Check if email is valid
    if (!EMAIL_REGEX.test(email)) {
      throw Object.assign(new Error('Invalid email'), {
        status: Status.BAD_REQUEST,
      });
    }

    // Check if a user with the given email exists
    await userDatabase.findByEmail(email).then((info) => (userInfo = info));

    if (!userInfo) {
      throw Object.assign(new Error('Email not registered with any user'), {
        status: Status.GONE,
      });
    }

    // Compare the entered password with the hashed password stored in the database
    if (!(await verifyPassword(userInfo.id, password))) {
      throw Object.assign(new Error('Incorrect password'), {
        status: Status.UNAUTHORIZED,
      });
    }

    return userInfo;
  } catch (err) {
    throw err;
  }
};

/**
 * Toggles the role of the user. Throws error if no parameters.
 * @param {string | number} id User ID
 */
exports.toggleUserRole = async (id) => {
  try {
    if (!id) {
      throw Object.assign(new Error('Missing user id'), { status: 400 });
    }

    return userDatabase.toggleUserRole(id);
  } catch (err) {
    throw err;
  }
};

exports.getAllUserInfo = async () => {
  try {
    return userDatabase.getAllUserInfo();
  } catch (err) {
    throw err;
  }
};

exports.getUserInfo = async (userId, email) => {
  try {
    // Check for no inputs
    if (!userId && !email) {
      throw Object.assign(new Error('Need at least id or email'), {
        status: Status.BAD_REQUEST,
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
 * Only supports changing of displayName and password.
 *
 * @param {int|string} userId ID of user in DB. Read-only.
 * @param {string} displayName New displayName
 */
exports.updateDisplayName = async (userId, displayName) => {
  try {
    if (!userId) {
      throw Object.assign(new Error('Missing id'), {
        status: Status.BAD_REQUEST,
      });
    }

    if (!displayName) {
      throw Object.assign(new Error('WARN: Nothing given, not doing update'), {
        status: Status.BAD_REQUEST,
      });
    }

    return userDatabase.updateDisplayName(userId, displayName);
  } catch (err) {
    throw err;
  }
};

exports.updateProgrammingLanguage = async (userId, programmingLanguage) => {
  try {
    if (!userId) {
      throw Object.assign(new Error('Missing id'), {
        status: Status.BAD_REQUEST,
      });
    }

    if (!programmingLanguage) {
      throw Object.assign(new Error('WARN: Nothing given, not doing update'), {
        status: Status.BAD_REQUEST,
      });
    }

    return userDatabase.updateProgrammingLanguage(userId, programmingLanguage);
  } catch (err) {
    throw err;
  }
};

exports.updateComplexity = async (userId, newComplexity) => {
  try {
    if (!userId) {
      throw Object.assign(new Error('Missing id'), {
        status: Status.BAD_REQUEST,
      });
    }

    if (!newComplexity) {
      throw Object.assign(new Error('WARN: Nothing given, not doing update'), {
        status: Status.BAD_REQUEST,
      });
    }

    return userDatabase.updateComplexity(userId, newComplexity);
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
exports.changeUserPassword = async (
  id,
  curPassword,
  newPassword,
  confirmPassword
) => {
  try {
    let _correctPassword = Boolean();

    // Check for missing inputs
    if (!id || !curPassword || !newPassword || !confirmPassword) {
      throw Object.assign(new Error('Missing inputs'), {
        status: Status.BAD_REQUEST,
      });
    }

    const passwordTest = verifyPassword(id, curPassword).then(
      (x) => (_correctPassword = x)
    );

    // Check that new password is not old password
    if (curPassword === newPassword) {
      throw Object.assign(new Error('New password cannot be old password'), {
        status: Status.BAD_REQUEST,
      });
    }

    // Confirm no typo in new password
    if (newPassword !== confirmPassword) {
      throw Object.assign(new Error('Confirm password not matching'), {
        status: Status.BAD_REQUEST,
      });
    }

    // Check if the password is at least 8 characters long
    if (
      newPassword.length < MIN_PASSWORD_LENGTH ||
      confirmPassword.length < MIN_PASSWORD_LENGTH
    ) {
      throw Object.assign(
        new Error('Password must be at least 8 characters long'),
        { status: Status.BAD_REQUEST }
      );
    }

    // Verify current password is correct
    await passwordTest;
    if (!_correctPassword) {
      throw Object.assign(new Error('Incorrect password'), {
        status: Status.UNAUTHORIZED,
      });
    }

    const password = bcrypt.hashSync(newPassword, BCRYPT_SALT_ROUNDS);
    if (!userDatabase.updatePassword(id, password)) {
      throw Object.assign(new Error('Failed to update password'), {
        status: Status.INTERNAL_SERVER_ERROR,
      });
    }
  } catch (err) {
    throw err;
  }
};

const verifyPassword = async (userId, givenPassword) => {
  const storedPassword = (await userDatabase.getUserInfoById(userId)).password;
  return bcrypt.compare(givenPassword, storedPassword);
};
