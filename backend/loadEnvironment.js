require('dotenv').config({ path: `${__dirname}/../.env` });

const REACT_APP_HOST = process.env.REACT_APP_HOST || 'http://localhost';

const SERVER_PORT = process.env.SERVER_PORT || 3001;
const AUTH_PORT = process.env.AUTH_PORT || 5001;

const AUTH_URL = REACT_APP_HOST + ':' + AUTH_PORT;

const MONGO_CLIENT = process.env.ATLAS_URI || '';

module.exports = {
  SERVER_PORT,
  MONGO_CLIENT,
  AUTH_URL,
};
