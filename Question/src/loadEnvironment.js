require('dotenv').config({ path: `${__dirname}/../../.env` });

// Config for this service
const QUESTION_PORT = process.env.QUESTION_PORT || 6001;

// Dependency Config: Auth Service
const AUTH_HOST = process.env.AUTH_HOST || 'localhost';
const AUTH_PORT = process.env.AUTH_PORT || 5001;
const AUTH_URL = 'http://' + AUTH_HOST + ':' + AUTH_PORT;

// Dependency Config: MongoDB
const MONGO_CLIENT = process.env.ATLAS_URI || '';

module.exports = {
  QUESTION_PORT,
  MONGO_CLIENT,
  AUTH_URL,
};
