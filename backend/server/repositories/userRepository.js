const User = require('../models/user');

const findByEmail = async (email) => {
  return await User.findOne({ email });
}

module.exports = {
  findByEmail
};
