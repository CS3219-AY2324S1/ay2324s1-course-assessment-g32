const amqp = require('amqplib');

var easyWaitingHost = undefined;
var mediumWaitingHost = undefined;
var hardWaitingHost = undefined;

// Change timeout value here, 30000ms = 30 seconds
const TIMEOUT = 30000;

// Calculates how long the host has been waiting
const waitingDuration = (timestamp) => {
  return Date.now() - timestamp;
}

// Generate a unique room id
const generateUniqueRoomId = () => {
  return "id" + Math.random().toString(16).slice(2);
};

const consume = async (queueName, channel, waitingHost) => {
  channel.consume(queueName, async (message) => {
    if (message !== null) {
      const request = JSON.parse(message.content.toString());

      // If the request is an exit request
      if (request.isExit) {
        if (waitingHost !== undefined) {
          const waitingHostRequest = JSON.parse(waitingHost.content.toString());
          if (waitingHostRequest.id === request.id) {
            const response = { message: `You have exited ${queueName} room!` };
            console.log(`Host ${waitingHostRequest.id} has exited ${queueName} room!`);
            channel.sendToQueue(waitingHostRequest.replyTo, Buffer.from(JSON.stringify(response)), {
              correlationId: waitingHostRequest.correlationId,
            });
            channel.ack(waitingHost);
            waitingHost = undefined;
          }
        }
        channel.ack(message);
        return;
      }

      if (waitingDuration(request.timestamp) > TIMEOUT) {
        const response = { message: `You have timed out in ${queueName} room!` };
        console.log(`Host ${request.id} has timed out in ${queueName} room!`);
        channel.sendToQueue(request.replyTo, Buffer.from(JSON.stringify(response)), {
          correlationId: request.correlationId,
        });
        channel.ack(message);
        return;
      }

      if (waitingHost !== undefined) {
        const waitingHostRequest = JSON.parse(waitingHost.content.toString());

        console.log(`Host ${request.id} is matched with host ${waitingHostRequest.id} in ${queueName} room!`);

        // TODO: Add a unique room id to the response
        const roomId = generateUniqueRoomId();

        const waitingHostResponse = {
          message: `You have been matched with host ${request.id} in ${queueName} room!`,
          isMatch: true,
          roomId: roomId
        };
        // Send the response back to reply queue
        channel.sendToQueue(waitingHostRequest.replyTo, Buffer.from(JSON.stringify(waitingHostResponse)), {
          correlationId: waitingHostRequest.correlationId,
        });

        const incomingHostResponse = {
          message: `You have been matched with host ${waitingHostRequest.id} in ${queueName} room!`,
          isMatch: true,
          roomId: roomId
        };
        channel.sendToQueue(request.replyTo, Buffer.from(JSON.stringify(incomingHostResponse)), {
          correlationId: request.correlationId,
        });

        // Acknowledge requests
        channel.ack(waitingHost);
        channel.ack(message);

        // Clear waiting host
        waitingHost = undefined;

      } else {
        console.log(`Host ${request.id} is waiting for a ${queueName} match...`);
        waitingHost = message;

        // Set timeout for waiting host
        setTimeout(() => {
          if (waitingHost === undefined) return;

          const waitingHostRequest = JSON.parse(waitingHost.content.toString());

          if (waitingHostRequest.correlationId === request.correlationId) {
            const response = { message: `You have timed out in ${queueName} room!` };

            console.log(`Host ${request.id} has timed out in ${queueName} room!`);

            channel.sendToQueue(request.replyTo, Buffer.from(JSON.stringify(response)), {
              correlationId: request.correlationId,
            });

            channel.ack(waitingHost);

            waitingHost = undefined;
          }
        }, TIMEOUT - waitingDuration(request.timestamp));
      }
    }
  });
};

const main = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  await channel.assertQueue('easy', { durable: false });
  await channel.assertQueue('medium', { durable: false });
  await channel.assertQueue('hard', { durable: false });
  await channel.assertQueue('easyResponseQueue', { durable: false });
  await channel.assertQueue('mediumResponseQueue', { durable: false });
  await channel.assertQueue('hardResponseQueue', { durable: false });

  console.log('Queueing service is running...');

  consume('easy', channel, easyWaitingHost);
  consume('medium', channel, mediumWaitingHost);
  consume('hard', channel, hardWaitingHost);
};

main().catch(console.error);
