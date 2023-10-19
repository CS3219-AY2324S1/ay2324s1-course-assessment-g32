require('dotenv').config({ path: `${__dirname}/../../.env` });

const QUESTION_PORT = process.env.QUESTION_PORT || 6001;

const AUTH_HOST = process.env.AUTH_HOST || 'localhost';
const AUTH_PORT = process.env.AUTH_PORT || 5001;
const AUTH_URL = 'http://' + AUTH_HOST + ':' + AUTH_PORT;

const MONGO_CLIENT = process.env.ATLAS_URI || '';

module.exports = {
  QUESTION_PORT,
  MONGO_CLIENT,
  AUTH_URL,
};
