require('dotenv').config({ path: `${__dirname}/../.env` });

const REACT_APP_HOST = process.env.REACT_APP_HOST || 'http://localhost';

const WEB_PORT = process.env.WEB_PORT || 3000;

const WEB_URL = REACT_APP_HOST + ':' + WEB_PORT;

const COLLABORATION_PORT = process.env.COLLABORATION_PORT || 8001;

module.exports = {
  WEB_URL,
  COLLABORATION_PORT,
};
