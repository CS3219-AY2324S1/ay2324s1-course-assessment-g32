const { v4: uuidv4 } = require('uuid');
const { TIMEOUT } = require('../constants');
const logger = require('../Log');

const waitingHosts = new Map();

// Calculates how long the host has been waiting
const waitingDuration = (timestamp) => {
  return Date.now() - timestamp;
};

const isTimeOut = (timestamp) => {
  return waitingDuration(timestamp) > TIMEOUT;
};

// Generate a unique room id
const generateUniqueRoomId = () => {
  return uuidv4();
};

const bufferData = (data) => {
  return Buffer.from(JSON.stringify(data));
};

// Handle request when the host exits the queue
const handleExitRequest = (request, channel, queueName, message) => {
  const waitingHost = waitingHosts.get(queueName);
  if (waitingHost !== undefined) {
    const waitingHostRequest = JSON.parse(waitingHost.content.toString());
    if (waitingHostRequest.sessionID === request.sessionID) {
      logger.debug(`Host ${waitingHostRequest.id} has exited ${queueName} queue`);

      const response = { message: `You have exited the queue` };
      channel.sendToQueue(waitingHostRequest.replyTo, bufferData(response), {
        correlationId: waitingHostRequest.correlationId,
      });
      channel.ack(waitingHost);
      waitingHosts.set(queueName, undefined);
    }
  }
  channel.ack(message);
};

// Handle request when the host in current queue times out
const handleTimeoutRequest = (request, channel, message) => {
  logger.debug(`Host ${request.id} timed out`);

  const response = { message: `No match found. You have timed out!` };
  channel.sendToQueue(request.replyTo, bufferData(response), {
    correlationId: request.correlationId,
  });
  channel.ack(message);
};

// Handle request when a single user is waiting in multiple tabs. Refresh host waiting time.
const checkMultipleTabsRequest = (request, channel, queueName) => {
  const waitingHost = waitingHosts.get(queueName);
  if (waitingHost !== undefined && JSON.parse(waitingHost.content.toString()).id === request.id) {
    const waitingHostRequest = JSON.parse(waitingHost.content.toString());
    const waitingHostResponse = {
      message: `You are waiting in multiple tabs!`,
    };
    logger.debug(`Host ${waitingHostRequest.id} is waiting in multiple tabs, removing earlier session from queue`);

    // Send the response to waiting host
    channel.sendToQueue(
      waitingHostRequest.replyTo,
      bufferData(waitingHostResponse),
      {
        correlationId: waitingHostRequest.correlationId,
      }
    );
    channel.ack(waitingHost);
    waitingHosts.set(queueName, undefined);
  }
};

// Handle request when 2 unique users are matched
const handleMatchedRequest = (request, channel, queueName, message, waitingHost) => {
  const waitingHostRequest = JSON.parse(waitingHost.content.toString());
  logger.logSuccess(`Matched Host ${waitingHostRequest.id} with Host ${request.id}`);

  const roomId = generateUniqueRoomId();
  const response = {
    message: `You found a match!`,
    isMatch: true,
    roomId: roomId,
  };

  logger.debug(`Removed host ${waitingHostRequest.id} from ${queueName} queue`);
  logger.debug(`Removed host ${request.id} from ${queueName} queue`);

  // Send the match response to the waiting host
  channel.sendToQueue(waitingHostRequest.replyTo, bufferData(response), {
    correlationId: waitingHostRequest.correlationId,
  });

  // Send the match response to the incoming host
  channel.sendToQueue(request.replyTo, bufferData(response), {
    correlationId: request.correlationId,
  });

  // Acknowledge requests
  channel.ack(waitingHost);
  channel.ack(message);
  waitingHosts.set(queueName, undefined);
};

// Handle no match request
const handleNoMatchRequest = (request, channel, queueName, message) => {
  // If there is no other host waiting in the queue
  waitingHosts.set(queueName, message);

  // Set a timeout for the host
  setTimeout(() => {
    const waitingHost = waitingHosts.get(queueName);
    if (waitingHost === undefined) return;

    const waitingHostRequest = JSON.parse(waitingHost.content.toString());

    // Ensure that there is no match before sending the timeout response
    if (waitingHostRequest.correlationId === request.correlationId) {
      logger.debug(`Host ${waitingHostRequest.id} timed out`);

      const response = { message: `No match found. You have timed out!` };
      channel.sendToQueue(request.replyTo, bufferData(response), {
        correlationId: request.correlationId,
      });

      channel.ack(waitingHost);
      waitingHosts.set(queueName, undefined);
    }
  }, TIMEOUT - waitingDuration(request.timestamp));
};

const consume = async (queueName, channel) => {
  channel.consume(queueName, async (message) => {
    if (message !== null) {
      const request = JSON.parse(message.content.toString());

      // Checks if the request is an exit request
      if (request.isExit) {
        handleExitRequest(request, channel, queueName, message);
        return;
      }

      // Checks if the host has timed out by the time the request is received by the queue (server)
      if (isTimeOut(request.timestamp)) {
        handleTimeoutRequest(request, channel, queueName);
        return;
      }

      // Refreshes waiting host if coming from the same user (user opens multiple tabs)
      checkMultipleTabsRequest(request, channel, queueName);

      const waitingHost = waitingHosts.get(queueName);

      // Checks if there is a host waiting in the queue
      if (waitingHost === undefined) {
        handleNoMatchRequest(request, channel, queueName, message);
      } else {
        handleMatchedRequest(request, channel, queueName, message, waitingHost);
      }
    }
  });
};

module.exports = consume;
