const userRepository = require('../repositories/userRepository');

const loginUser = async (email, password) => {

  // Find the user with the given email from the database
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new Error('User not found');
  }

  // Compare the provided password with the hashed password stored in the database
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error('Incorrect password');
  }

  return user;
};

module.exports = {
  loginUser
};
