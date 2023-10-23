require('dotenv').config({ path: `${__dirname}/../.env` });

const REACT_APP_HOST = process.env.REACT_APP_HOST || 'http://localhost';

const HISTORY_PORT = process.env.HISTORY_PORT || 9001;

const HISTORY_URL = REACT_APP_HOST + ':' + HISTORY_PORT;

const MONGO_CLIENT = process.env.ATLAS_URI || '';

module.exports = {
  HISTORY_PORT,
  HISTORY_URL,
  MONGO_CLIENT,
};
