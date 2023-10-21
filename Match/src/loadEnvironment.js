require('dotenv').config({ path: `${__dirname}/../../.env` });

// Config for this service
const MATCH_PORT = process.env.MATCH_PORT || 7001;

// Dependency Config: Auth Service
const AUTH_HOST = process.env.AUTH_HOST || 'localhost';
const AUTH_PORT = process.env.AUTH_PORT || 5001;
const AUTH_URL = 'http://' + AUTH_HOST + ':' + AUTH_PORT;

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';

module.exports = {
  MATCH_PORT,
  AUTH_URL,
  RABBITMQ_URL,
};
