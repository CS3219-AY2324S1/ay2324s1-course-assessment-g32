require('dotenv').config({ path: `${__dirname}/../../.env` });

const AUTH_PORT = process.env.AUTH_PORT || 5001;

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '';

module.exports = {
  AUTH_PORT,
  JWT_SECRET_KEY,
};
