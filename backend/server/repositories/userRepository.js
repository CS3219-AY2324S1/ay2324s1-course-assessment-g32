const User = require('../models/user');

const findByEmail = async (email) => {
  return await User.findOne({ email });
}

const createUser = async (email, hashedPassword) => {
  try {
    const user = new User({
      email: email,
      password: hashedPassword
    });

    // Save the user to the database
    await user.save();

    return user;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  findByEmail,
  createUser
};
