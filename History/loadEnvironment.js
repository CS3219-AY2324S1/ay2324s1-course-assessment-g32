require('dotenv').config({ path: `${__dirname}/../.env` });

const REACT_APP_HOST = process.env.REACT_APP_HOST || 'http://localhost';

const HISTORY_PORT = process.env.HISTORY_PORT || 9001;

const HISTORY_URL = REACT_APP_HOST + ':' + HISTORY_PORT;

const QUESTION_PORT = process.env.QUESTION_PORT || 6001;

const QUESTION_URL = REACT_APP_HOST + ':' + QUESTION_PORT;

const AUTH_PORT = process.env.AUTH_PORT || 5001;

const AUTH_URL = REACT_APP_HOST + ':' + AUTH_PORT;

const MONGO_CLIENT = process.env.ATLAS_URI || '';

module.exports = {
  HISTORY_PORT,
  HISTORY_URL,
  QUESTION_URL,
  MONGO_CLIENT,
  AUTH_URL,
};
