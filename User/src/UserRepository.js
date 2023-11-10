const userModel = require('./UserModel');

exports.createUser = async (email, password) => {
  const hashedPassword = await password;

  try {
    const user = new userModel({
      displayName: getDisplayNameFromEmail(email),
      email: email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    return user;
  } catch (err) {
    throw err;
  }
};

/**
 * Delete user of given id from the database.
 * @param {string} id
 * @returns {bool} If the deletion was successful
 */
exports.deleteUser = async (id) => {
  try {
    const result = await userModel.deleteOne({ _id: id });
    return result.deletedCount > 0;
  } catch (err) {
    throw err;
  }
};

/**
 * Finds and returns id of user with email.
 *
 * @param {string} email
 * @returns {userId, isMaintainer}
 */
exports.findByEmail = async (email) => {
  try {
    const result = await userModel
      .findOne({ email: email }, '_id isMaintainer')
      .lean();
    if (result) {
      result.id = result._id;
      delete result._id;
    }
    return result;
  } catch (err) {
    throw err;
  }
};

exports.getAllUserInfo = async () => {
  try {
    let result = await userModel
      .find({}, 'displayName email createdAt updatedAt isMaintainer')
      .lean();
    result = result.map((user) => {
      user.id = user._id;
      delete user._id;
      return user;
    });
    if (!result) {
      throw 'No users to be retrieved';
    }
    return result;
  } catch (err) {
    throw err;
  }
};

/**
 * Finds and returns user information with id.
 *
 * @param {string} id
 * @returns {Object} User information
 */
exports.getUserInfoById = async (id) => {
  try {
    const result = await userModel.findById(id).lean();
    if (result) {
      result.id = result._id;
      delete result._id;
    } else {
      throw 'No user with id ' + id;
    }
    return result;
  } catch (err) {
    throw err;
  }
};

exports.getUserInfoByEmail = async (email) => {
  var _userId = String();
  await findByEmail(email).then((userInfo) => (_userId = userInfo.id));

  if (!_userId) throw 'No user is using ' + email;

  return getUserInfoById(_userId);
};

/**
 * Updates and returns user information with id.
 *
 * @param {string} id
 * @param {string} displayName
 * @returns {Boolean} Success or failure
 */
exports.updateDisplayName = async (id, displayName) => {
  try {
    const update = {
      displayName: displayName,
    };
    const result = await userModel.findByIdAndUpdate(id, update, { new: true });
    return result !== null;
  } catch (err) {
    throw err;
  }
};

exports.updateProgrammingLanguage = async (id, programmingLanguage) => {
  try {
    const update = {
      language: programmingLanguage,
    };
    const result = await userModel.findByIdAndUpdate(id, update, { new: true });
    return result !== null;
  } catch (err) {
    throw err;
  }
};

exports.updateComplexity = async (id, newComplexity) => {
  try {
    const update = {
      complexity: newComplexity,
    };
    const result = await userModel.findByIdAndUpdate(id, update, { new: true });
    return result !== null;
  } catch (err) {
    throw err;
  }
};

/**
 * Updates and returns user information with id.
 *
 * @param {string} id
 * @param {string} password
 * @returns {Boolean} Success or failure
 */
exports.updatePassword = async (id, password) => {
  try {
    const update = { password: password };
    const result = await userModel.findByIdAndUpdate(id, update, { new: true });
    return result !== null;
  } catch (err) {
    throw err;
  }
};

/**
 * Toggle role of user of given id from the database.
 * @param {string} id
 * @returns If the deletion was successful
 */
exports.toggleUserRole = async (id) => {
  const user = await exports.getUserInfoById(id);
  const newIsMaintainer = user?.isMaintainer ? 0 : 1; // Toggle the isMaintainer field
  try {
    const update = { isMaintainer: newIsMaintainer };
    const result = await userModel.findByIdAndUpdate(id, update, { new: true });
    return result !== null;
  } catch (err) {
    throw err;
  }
};

const getDisplayNameFromEmail = (email) => {
  // Assumes displayName from email (up until '@')
  return email.substring(0, email.indexOf('@'));
};
