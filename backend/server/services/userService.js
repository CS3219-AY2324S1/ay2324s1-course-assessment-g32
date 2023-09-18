const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');

const createUser = async (email, password, confirmPassword) => {
  try {
    // Check for missing inputs
    if (!email || !password || !confirmPassword) {
      throw { status: 400, message: 'Missing inputs' };
    }

    // Check if a user with the given email already exists
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw { status: 400, message: 'User already exists' };
    }

    // Check if the password and confirm password match
    if (password !== confirmPassword) {
      throw { status: 400, message: 'Passwords do not match' };
    }

    // Check if the password is at least 8 characters long
    if (password.length < 8) {
      throw { status: 400, message: 'Password must be at least 8 characters long' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userRepository.createUser(email, hashedPassword);

    return user;
  } catch (err) {
    throw err;
  }
};

const loginUser = async (email, password) => {
  try {
    // Check for missing inputs
    if (!email || !password) {
      throw { status: 400, message: 'Missing inputs' };
    }

    // Check if a user with the given email exists
    const user = await userRepository.findByEmail(email);
    if (!user) {
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

module.exports = {
  createUser,
  loginUser
};
