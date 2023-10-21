require('dotenv').config({ path: `${__dirname}/../../.env` });

// Config for this service
const COLLAB_PORT = process.env.COLLAB_PORT || 8001;

// Dependency Config: Web
const REACT_APP_HOST = process.env.REACT_APP_HOST || 'http://localhost';
const WEB_PORT = process.env.WEB_PORT || 3000;
const WEB_URL = REACT_APP_HOST + ':' + WEB_PORT;

module.exports = {
  COLLAB_PORT,
  WEB_URL,
};
