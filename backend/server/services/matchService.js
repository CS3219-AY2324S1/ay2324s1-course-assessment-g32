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

const consume = async (queueName, channel, waitingHost) => {
  channel.consume(queueName, async (message) => {
    if (message !== null) {
      const request = JSON.parse(message.content.toString());

      // If the request is an exit request
      if (request.isExit) {
        if (waitingHost !== undefined) {
          const waitingHostRequest = JSON.parse(waitingHost.content.toString());
          if (waitingHostRequest.id === request.id) {
            const response = { message: `Host ${waitingHostRequest.id} has exited ${queueName} room!` };
            console.log(response.message);
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
        const response = { message: `Host ${request.id} has timed out in ${queueName} room!` };
        console.log(response.message);
        channel.sendToQueue(request.replyTo, Buffer.from(JSON.stringify(response)), {
          correlationId: request.correlationId,
        });
        channel.ack(message);
        return;
      }

      if (waitingHost !== undefined) {
        const waitingHostRequest = JSON.parse(waitingHost.content.toString());

        const response = { message: `Host ${request.id} is matched with host ${waitingHostRequest.id} in ${queueName} room!` };
        console.log(response.message);

        // Send the response back to reply queue
        channel.sendToQueue(waitingHostRequest.replyTo, Buffer.from(JSON.stringify(response)), {
          correlationId: waitingHostRequest.correlationId,
        });

        channel.sendToQueue(request.replyTo, Buffer.from(JSON.stringify(response)), {
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
            const response = { message: `Host ${request.id} has timed out in ${queueName} room!` };
            console.log(response.message);

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

  await channel.assertQueue('Easy', { durable: false });
  await channel.assertQueue('Medium', { durable: false });
  await channel.assertQueue('Hard', { durable: false });
  await channel.assertQueue('EasyResponseQueue', { durable: false });
  await channel.assertQueue('MediumResponseQueue', { durable: false });
  await channel.assertQueue('HardResponseQueue', { durable: false });

  console.log('Queueing service is running...');

  consume('Easy', channel, easyWaitingHost);
  consume('Medium', channel, mediumWaitingHost);
  consume('Hard', channel, hardWaitingHost);
};

main().catch(console.error);
