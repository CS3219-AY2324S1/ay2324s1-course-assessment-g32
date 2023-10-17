const { v4: uuidv4 } = require('uuid');

// Timeout value; 30000ms = 30s
const TIMEOUT = 30000;
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

// Handle request when the host exits the queue
const handleExitRequest = (request, channel, queueName, message) => {
  const waitingHost = waitingHosts.get(queueName);
  if (waitingHost !== undefined) {
    const waitingHostRequest = JSON.parse(waitingHost.content.toString());
    if (waitingHostRequest.sessionID === request.sessionID) {
      const response = { message: `You have exited ${queueName} room!`, };
      console.log(`Host ${waitingHostRequest.id} has exited ${queueName} room!`);
      channel.sendToQueue(
        waitingHostRequest.replyTo,
        Buffer.from(JSON.stringify(response)),
        {
          correlationId: waitingHostRequest.correlationId,
        }
      );
      channel.ack(waitingHost);
      waitingHosts.set(queueName, undefined);
    }
  }
  channel.ack(message);
};

// Handle request when the host in current queue times out
const handleTimeoutRequest = (request, channel, queueName, message) => {
  const response = { message: `You have timed out in ${queueName} room!`, };
  console.log(`Host ${request.id} has timed out in ${queueName} room!`);
  channel.sendToQueue(
    request.replyTo,
    Buffer.from(JSON.stringify(response)),
    {
      correlationId: request.correlationId,
    }
  );
  channel.ack(message);
};

// Handle request when a single user is waiting in multiple tabs. Refresh host waiting time.
const checkMultipleTabsRequest = (request, channel, queueName, message) => {

  const waitingHost = waitingHosts.get(queueName);

  if (waitingHost !== undefined && JSON.parse(waitingHost.content.toString()).id === request.id) {
    const waitingHostRequest = JSON.parse(waitingHost.content.toString());

    console.log(`Host ${waitingHostRequest.id} is already waiting in ${queueName} room!`);
    const waitingHostResponse = { message: `You are waiting in multiple tabs!`, };
    // Send the response to waiting host
    channel.sendToQueue(
      waitingHostRequest.replyTo,
      Buffer.from(JSON.stringify(waitingHostResponse)),
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

  console.log(`Host ${request.id} is matched with host ${waitingHostRequest.id} in ${queueName} room!`);

  const roomId = generateUniqueRoomId();
  const waitingHostResponse = {
    message: `You have been matched with host ${request.id} in ${queueName} room!`,
    isMatch: true,
    roomId: roomId,
    hostId: waitingHostRequest.id,
    matchedHostId: request.id,
  };
  // Send the match response to the waiting host
  channel.sendToQueue(
    waitingHostRequest.replyTo,
    Buffer.from(JSON.stringify(waitingHostResponse)),
    {
      correlationId: waitingHostRequest.correlationId,
    }
  );

  const incomingHostResponse = {
    message: `You have been matched with host ${waitingHostRequest.id} in ${queueName} room!`,
    isMatch: true,
    roomId: roomId,
    hostId: request.id,
    matchedHostId: waitingHostRequest.id,
  };
  // Send the match response to the incoming host
  channel.sendToQueue(
    request.replyTo,
    Buffer.from(JSON.stringify(incomingHostResponse)),
    {
      correlationId: request.correlationId,
    }
  );

  // Acknowledge requests
  channel.ack(waitingHost);
  channel.ack(message);
  waitingHosts.set(queueName, undefined);
};

// Handle no match request
const handleNoMatchRequest = (request, channel, queueName, message) => {
  // If there is no other host waiting in the queue
  console.log(`Host ${request.id} is waiting for a ${queueName} match...`);
  waitingHosts.set(queueName, message);

  // Set a timeout for the host
  setTimeout(() => {
    const waitingHost = waitingHosts.get(queueName);
    if (waitingHost === undefined) return;

    const waitingHostRequest = JSON.parse(waitingHost.content.toString());

    // Ensure that there is no match before sending the timeout response
    if (waitingHostRequest.correlationId === request.correlationId) {
      const response = { message: `You have timed out in ${queueName} room!`, };
      console.log(`Host ${request.id} has timed out in ${queueName} room!`);

      channel.sendToQueue(
        request.replyTo,
        Buffer.from(JSON.stringify(response)),
        {
          correlationId: request.correlationId,
        }
      );

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
        handleTimeoutRequest(request, channel, queueName, message);
        return;
      }

      // Refreshes waiting host if coming from the same user (user opens multiple tabs)
      checkMultipleTabsRequest(request, channel, queueName, message);

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
