require('dotenv').config({ path: `${__dirname}/../../.env` });

const REACT_APP_HOST = process.env.REACT_APP_HOST || 'http://localhost';

const AUTH_PORT = process.env.AUTH_PORT || 5001;
const AUTH_URL = REACT_APP_HOST + ':' + AUTH_PORT;

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';

const MATCH_PORT = process.env.MATCH_PORT || 7001;

module.exports = {
  MATCH_PORT,
  AUTH_URL,
  RABBITMQ_URL,
};
