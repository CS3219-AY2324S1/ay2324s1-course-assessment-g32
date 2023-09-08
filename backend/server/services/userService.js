const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');

const createUser = async (email, password) => {
  try {
    // Check if a user with the given email already exists
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
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
    // Find the user with the given email from the database
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    // Compare the entered password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Incorrect password');
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
