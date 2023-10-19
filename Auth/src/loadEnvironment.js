require('dotenv').config({ path: `${__dirname}/../../.env` });

// Config for this service
const AUTH_PORT = process.env.AUTH_PORT || 5001;

// Dependency Config: JWT
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '';

module.exports = {
  AUTH_PORT,
  JWT_SECRET_KEY,
};
