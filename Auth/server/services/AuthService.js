const authDatabase = require('../repositories/authRepoMySql.js');
const bcrypt = require('bcrypt');

const loginUser = async (email, password) => {
    try {
      let userInfo = new Object();
  
      // Check for missing inputs
      if (!email || !password) {
        throw Object.assign(new Error('Missing inputs'), { status: 400 });
      }
  
      // Check if a user with the given email exists
      await authDatabase.findByEmail(email).then((info) => (userInfo = info));
  
      if (!userInfo) {
        throw Object.assign(new Error('Email not registered with any user'), {
          status: 410,
        });
      }
  
      // Compare the entered password with the hashed password stored in the database
      if (!(await authenticate(userInfo._userId, password))) {
        throw Object.assign(new Error('Incorrect password'), { status: 401 });
      }
  
      return userInfo;
    } catch (err) {
      throw err;
    }
  };
  
const createUser = async (email, password, confirmPassword) => {
  try {
    console.log("creating user in authService");
    let passExistingUserCheck = undefined;

    // Check for missing inputs
    if (!email || !password || !confirmPassword) {
      throw Object.assign(new Error('Missing inputs'), { status: 400 });
    }

    // Check if email is valid
    var emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      console.log("email failed format")
      throw Object.assign(new Error('Invalid email'), { status: 400 });
    }

    // Check if a user with the given email already exists
    const existingUserCheck = authDatabase
      .findByEmail(email)
      .then((userInfo) => {
        passExistingUserCheck = userInfo._userId == null;
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
    await authDatabase.createUser(email, bcrypt.hash(password, 10));
  } catch (err) {
      throw err;
  }
};

const authenticate = async (userId, givenPassword) => {
  const storedPassword = (await authDatabase.getUserInfoById(userId)).password;
  return bcrypt.compare(givenPassword, storedPassword);
};

module.exports = {
  loginUser,
  createUser,
  authenticate,
}