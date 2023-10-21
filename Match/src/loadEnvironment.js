require('dotenv').config({ path: `${__dirname}/../../.env` });

// Config for this service
const MATCH_PORT = process.env.MATCH_PORT || 7001;

// Dependency Config: Auth Service
const AUTH_HOST = process.env.AUTH_HOST || 'localhost';
const AUTH_PORT = process.env.AUTH_PORT || 5001;
const AUTH_URL = 'http://' + AUTH_HOST + ':' + AUTH_PORT;

// Dependency Config: RabbitMQ
const RABBITMQ_HOST = process.env.RABBITMQ_HOST || 'localhost';
const RABBITMQ_PORT = process.env.RABBITMQ_PORT || 5672;
const RABBITMQ_URL = 'amqp://' + RABBITMQ_HOST + ':' + RABBITMQ_PORT;

module.exports = {
  MATCH_PORT,
  AUTH_URL,
  RABBITMQ_URL,
};
