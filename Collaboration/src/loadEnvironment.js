require('dotenv').config({ path: `${__dirname}/../../.env` });

// Config for this service
const COLLAB_PORT = process.env.COLLAB_PORT || 8001;

// Dependency Config: Web
const REACT_APP_HOST = process.env.REACT_APP_HOST || 'http://localhost';

// Dependency Config: Redis
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_URL = 'redis://' + REDIS_HOST + ':' + REDIS_PORT;

module.exports = {
  COLLAB_PORT,
  REACT_APP_HOST,
  REDIS_URL,
};
