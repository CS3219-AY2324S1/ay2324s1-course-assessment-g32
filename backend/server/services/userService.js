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
    var noSuchUser = Boolean();

    // Check for missing inputs
    if (!email || !password) {
      throw { status: 400, message: 'Missing inputs' };
    }

    // Check if a user with the given email exists
    const existingUserCheck = userDatabase
      .findByEmail(email)
      .then(userId => { 
        noSuchUser = userId == null; 
      });
    await existingUserCheck;
    if (noSuchUser) {
      throw { status: 400, message: 'User not found' };
    }

    // Compare the entered password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw { status: 400, message: 'Incorrect password' };
    }

    return user;
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

module.exports = {
  createUser,
  loginUser,

  // still in testing
  getUserInfo,
};
