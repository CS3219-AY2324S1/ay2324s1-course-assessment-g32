const userDatabase = require('../repositories/userRepoMySql');

const bcrypt = require('bcrypt');

const createUser = async (email, password, confirmPassword) => {
  try {
    var passExistingUserCheck = undefined;

    // Check for missing inputs
    if (!email || !password || !confirmPassword) {
      throw { status: 400, message: 'Missing inputs' };
    }

    // Check if a user with the given email already exists
    const existingUserCheck = userDatabase
      .findByEmail(email)
      .then(userId => { 
        passExistingUserCheck = userId == null;
      });

    // Check if the password is at least 8 characters long
    if (password.length < 8) {
      throw { status: 400, message: 'Password must be at least 8 characters long' };
    }

    // Check if the password and confirm password match
    if (password !== confirmPassword) {
      throw { status: 400, message: 'Passwords do not match' };
    }

    // Check results of existingUserCheck
    await existingUserCheck;
    if (passExistingUserCheck === undefined) {
      console.error("No results from existingUserCheck");
    }
    if (!passExistingUserCheck) {
      throw { status: 400, message: 'User already exists' };
    }
    
    // Create using with email and hashed password
    userDatabase.createUser(email, bcrypt.hash(password, 10));
  } catch (err) {
    throw err;
  }
};

const loginUser = async (email, password) => {
  try {
    var userId = Number();

    // Check for missing inputs
    if (!email || !password) {
      throw { status: 400, message: 'Missing inputs' };
    }

    // Check if a user with the given email exists
    await userDatabase.findByEmail(email)
      .then(id => userId = id);
  
    if (!userId) {
      throw { status: 400, message: 'Email not registered with any user' };
    }

    // Compare the entered password with the hashed password stored in the database
    // FIXME: need to find a way to retrieve stored hashed password
    if (!bcrypt.compareSync(password, user.password)) {
      throw { status: 400, message: 'Incorrect password' };
    }

    return userId;
  } catch (err) {
    throw err;
  }
};

const getUserInfo = async (userId, email) => {
  try {
    if (!userId && !email) {
      throw { status: 400, message: 'Need at least id or email' };
    }

    if (userId != null)
         return userDatabase.getUserInfoById(userId);
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
 * @param {string} password New password
 */
const updateUser = async (userId, username, password) =>{
  try {
    if (!userId) {
      throw { status: 400, message: 'Missing userId' };
    }

    if (!username && !password) {
      throw { status: 400, message: 'WARN: Nothing given, not doing update' };
    }

    if (password) {
      password = bcrypt.hashSync(password, 10);
    }

    return userDatabase.updateUser(userId, username, password);
    
  } catch (err) {
    throw err;
  }
};

const deleteUser = async (id) => {
  try {
    var _success = Boolean();

    // Check for missing inputs
    if (!id) {
      throw { status: 400, message: 'Missing id' };
    }

    await userDatabase.deleteUser(id).then(x => _success = x);

    if (!_success) {
      throw { status: 400, message: 'Failed to delete user. Does user exists?' }; 
    }

    } catch (err) {
      throw err;
    }
};

module.exports = {
  createUser, // Create
  getUserInfo, // Read
  updateUser, // Update
  deleteUser, // Delete

  loginUser,
};
