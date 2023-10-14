const amqp = require('amqplib');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const queueRoutes = require('./server/routes/queue');
const consume = require('./server/services/consumeService');
const env = require('./loadEnvironment');

console.log('Starting server ...');

// start the Express (web) server to listen for incoming RESTFul API requests
const expressServer = async () => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use('/queue', queueRoutes);
  app.listen(env.MATCH_PORT, () => {
    console.log(`Server is running on port: ${env.MATCH_PORT}`);
  });
};

// connect to RabbitMQ server to listen for incoming messages
const rabbitMQserver = async () => {
  const connection = await amqp.connect(env.RABBITMQ_URL);
  const channel = await connection.createChannel();

  await channel.assertQueue('commonQueue', { durable: false });

  console.log('Queueing service is running...');

  // Consume from the common queue
  channel.consume('commonQueue', async (message) => {
    if (message !== null) {
      const { requestQueue, responseQueue } = JSON.parse(message.content.toString());

      // Create the request and response queues if they do not exist
      await channel.assertQueue(requestQueue, { durable: false, autoDelete: true });
      await channel.assertQueue(responseQueue, { durable: false, autoDelete: true });
      channel.ack(message);

      // Start consuming from the request queue
      consume(requestQueue, channel);
    }
  });
};

expressServer().catch(console.error);
rabbitMQserver().catch(console.error);
