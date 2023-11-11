const amqp = require('amqplib');
const { v4: uuidv4 } = require('uuid');
const authApi = require('../helpers/callsToAuth');
const env = require('../loadEnvironment');
const logger = require('../Log');

// Generate a unique id
const generateUuid = () => {
  return uuidv4();
};

/*
  Uses a request-reply messaging pattern.
  The requester (client) sends a request to requestQueue (to join the queue).
  The responder (server) consumes and process the request, and sends a response to responseQueue.
  The requester (client) consumes the response to get the result.
*/
const joinQueue = async (jwt, queueName, sessionID) => {
  const connection = await amqp.connect(env.RABBITMQ_URL);
  const channel = await connection.createChannel();

  const requestQueue = queueName;
  const responseQueue = queueName + 'Response';

  await channel.assertQueue('commonQueue', { durable: false });
  await channel.assertQueue(requestQueue, { durable: false, autoDelete: true });
  await channel.assertQueue(responseQueue, { durable: false, autoDelete: true });

  // Send the names of the request and response queues to the common queue for the server to create the queues
  channel.sendToQueue(
    'commonQueue',
    Buffer.from(
      JSON.stringify({
        requestQueue: requestQueue,
        responseQueue: responseQueue,
      })
    )
  );

  const correlationId = generateUuid();

  // Decrypt the userId from the jwt
  const decryptedUser = await authApi.authorize(jwt);
  const userId = decryptedUser.data.userInfo.userId;

  const message = {
    id: userId,
    replyTo: responseQueue,
    correlationId: correlationId,
    timestamp: Date.now(),
    isExit: false,
    sessionID: sessionID,
  };

  logger.debug(`Host ${userId} joined ${queueName} queue successfully`);

  // Send the message to the request queue with the queue name as a property
  channel.sendToQueue(requestQueue, Buffer.from(JSON.stringify(message)), {
    queueName: queueName,
  });

  // Used to check if the connection is closed
  return new Promise((resolve, reject) => {
    // Waits for the response with matching correlation ID
    channel.consume(
      responseQueue,
      (response) => {
        if (response.properties.correlationId === correlationId) {
          const responseBody = JSON.parse(response.content.toString());
          resolve(responseBody);
          channel.ack(response);

          // Close the connection
          isClosed = true;
          channel.close();
          connection.close();
        }
      },
      { noAck: false }
    );
  });
};

// Send an exit request to the request queue
const exitQueue = async (jwt, queueName, sessionID) => {
  const connection = await amqp.connect(env.RABBITMQ_URL);
  const channel = await connection.createChannel();

  const requestQueue = queueName;
  await channel.assertQueue(requestQueue, { durable: false, autoDelete: true });

  // Decrypt the userId from the jwt
  const decryptedUser = await authApi.authorize(jwt);
  const userId = decryptedUser.data.userInfo.userId;

  const message = {
    id: userId,
    isExit: true,
    sessionID: sessionID,
  };

  // Send the message to the request queue
  channel.sendToQueue(requestQueue, Buffer.from(JSON.stringify(message)));
};

module.exports = {
  joinQueue,
  exitQueue,
};
