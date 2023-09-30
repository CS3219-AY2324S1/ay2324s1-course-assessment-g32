const amqp = require('amqplib');
const { v4: uuidv4 } = require('uuid');
const url = 'amqp://localhost';

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
const joinQueue = async (id, queueName, sessionID) => {
  const connection = await amqp.connect(url);
  const channel = await connection.createChannel();

  const requestQueue = queueName;
  const responseQueue = queueName + 'Response';

  await channel.assertQueue('commonQueue', { durable: false });
  await channel.assertQueue(requestQueue, { durable: false, autoDelete: true });
  await channel.assertQueue(responseQueue, { durable: false, autoDelete: true });

  // Send the names of the request and response queues to the common queue for the server to create the queues
  channel.sendToQueue('commonQueue', Buffer.from(JSON.stringify({
    requestQueue: requestQueue,
    responseQueue: responseQueue
  })));

  const correlationId = generateUuid();

  const message = {
    id: id,
    replyTo: responseQueue,
    correlationId: correlationId,
    timestamp: Date.now(),
    isExit: false,
    sessionID: sessionID
  };

  // Send the message to the request queue with the queue name as a property
  channel.sendToQueue(requestQueue, Buffer.from(JSON.stringify(message)), {
    queueName: queueName
  });

  // Used to check if the connection is closed
  return new Promise((resolve, reject) => {
    // Waits for the response with matching correlation ID
    channel.consume(responseQueue, (response) => {
      if (response.properties.correlationId === correlationId) {
        const responseBody = JSON.parse(response.content.toString());
        resolve(responseBody);
        channel.ack(response);

        // Close the connection
        isClosed = true;
        channel.close();
        connection.close();
      }
    }, { noAck: false });
  });
};

// Send an exit request to the request queue
const exitQueue = async (id, queueName, sessionID) => {
  const connection = await amqp.connect(url);
  const channel = await connection.createChannel();

  const requestQueue = queueName;
  await channel.assertQueue(requestQueue, { durable: false, autoDelete: true });

  const message = {
    id: id,
    isExit: true,
    sessionID: sessionID
  };

  // Send the message to the request queue
  channel.sendToQueue(requestQueue, Buffer.from(JSON.stringify(message)));
};

module.exports = {
  joinQueue,
  exitQueue
};
