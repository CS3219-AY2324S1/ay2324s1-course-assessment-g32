require('dotenv').config({ path: `${__dirname}/../.env` });

const REACT_APP_HOST = process.env.REACT_APP_HOST || 'http://localhost';

const QUESTION_PORT = process.env.QUESTION_PORT || 6001;

const AUTH_PORT = process.env.AUTH_PORT || 5001;
const AUTH_URL = REACT_APP_HOST + ':' + AUTH_PORT;

const MONGO_CLIENT = process.env.ATLAS_URI || '';

module.exports = {
  QUESTION_PORT,
  MONGO_CLIENT,
  AUTH_URL,
};
