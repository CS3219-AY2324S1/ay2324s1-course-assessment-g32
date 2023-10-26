const amqp = require('amqplib');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const queueRoutes = require('./QueueRoutes');
const consume = require('./services/consumerService');
const env = require('./loadEnvironment');
const { MAX_CONNECTION_ATTEMPTS, CONNECTION_INTERVAL } = require('./constants');

console.log('Starting MatchServer ...');

// Start the Express (web) server to listen for incoming RESTFul API requests
const expressServer = async () => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use('/queue', queueRoutes);
  app.listen(env.MATCH_PORT, () => {
    console.log(`MatchServer is running on port: ${env.MATCH_PORT}`);
  });
};

// Connect to RabbitMQ server to listen for incoming messages
const rabbitMQserver = async () => {

  var connection = null;

  // Try to connect to RabbitMQ server 10 times with 5 second intervals
  for (let i = 0; i < MAX_CONNECTION_ATTEMPTS; i++) {
    try {
      connection = await amqp.connect(env.RABBITMQ_URL);
      break;
    } catch (error) {
      console.error(`MatchServer could not connect to RabbitMQ server: ${env.RABBITMQ_URL} in attempt ${i + 1} of 10`);
      await new Promise(resolve => setTimeout(resolve, CONNECTION_INTERVAL));
    }
  }

  // If connection is still null, exit the process
  if (connection === null) {
    console.error(`Matchserver could not connect to RabbitMQ server: ${env.RABBITMQ_URL}`);
    process.exit(1);
  }

  const channel = await connection.createChannel();
  await channel.assertQueue('commonQueue', { durable: false });

  console.log(`Matchserver is connected to RabbitMQ server: ${env.RABBITMQ_URL}`)

  // Consume from the common queue
  channel.consume('commonQueue', async (message) => {
    if (message !== null) {
      const { requestQueue, responseQueue } = JSON.parse(message.content.toString());

      // Create the request and response queues if they do not exist
      await channel.assertQueue(requestQueue, { durable: false, autoDelete: true, });
      await channel.assertQueue(responseQueue, { durable: false, autoDelete: true, });
      channel.ack(message);

      // Start consuming from the request queue
      consume(requestQueue, channel);
    }
  });
};

expressServer().catch(console.error);
rabbitMQserver().catch(console.error);
