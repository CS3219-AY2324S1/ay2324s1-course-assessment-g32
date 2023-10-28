require('dotenv').config({ path: `${__dirname}/../../.env` });

// Config for this service
const HISTORY_PORT = process.env.HISTORY_PORT || 9001;

// Dependency Config: Auth Service
const AUTH_HOST = process.env.AUTH_HOST || 'localhost';
const AUTH_PORT = process.env.AUTH_PORT || 5001;
const AUTH_URL = 'http://' + AUTH_HOST + ':' + AUTH_PORT;

// Dependency Config: Question Service
const QUESTION_HOST = process.env.QUESTION_HOST || 'localhost';
const QUESTION_PORT = process.env.QUESTION_PORT || 6001;
const QUESTION_URL = 'http://' + QUESTION_HOST + ':' + QUESTION_PORT;

// Dependency Config: MongoDB
const MONGO_CLIENT = process.env.ATLAS_URI || '';

module.exports = {
  HISTORY_PORT,
  QUESTION_URL,
  MONGO_CLIENT,
  AUTH_URL,
};
