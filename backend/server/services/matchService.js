const amqp = require('amqplib');

rabbitMQ = {
  url: 'amqp://localhost',
  exchange: 'findOpponent',
};

const findMatch = async () => {
  const connection = await amqp.connect(rabbitMQ.url);
  const channel = await connection.createChannel();

  var easyWaitingHost = undefined;
  var mediumWaitingHost = undefined;
  var hardWaitingHost = undefined;

  await channel.assertExchange(rabbitMQ.exchange, 'direct');

  const easyQueue = await channel.assertQueue('EasyQueue');
  const mediumQueue = await channel.assertQueue('MediumQueue');
  const hardQueue = await channel.assertQueue('HardQueue');

  await channel.bindQueue(easyQueue.queue, rabbitMQ.exchange, 'Easy');
  await channel.bindQueue(mediumQueue.queue, rabbitMQ.exchange, 'Medium');
  await channel.bindQueue(hardQueue.queue, rabbitMQ.exchange, 'Hard');

  await channel.consume(easyQueue.queue, (msg) => {
    const data = JSON.parse(msg.content);
    if (easyWaitingHost !== undefined) {
      const waitingHostData = JSON.parse(easyWaitingHost.content);
      channel.ack(easyWaitingHost);
      channel.ack(msg);
      console.log(`Match found for Easy! Matched ${waitingHostData.id} and ${data.id}`);
      easyWaitingHost = undefined;
    } else {
      console.log(`No match found for Easy. Host ${data.id} is waiting.`);
      easyWaitingHost = msg;
    }
  });

  await channel.consume(mediumQueue.queue, (msg) => {
    const data = JSON.parse(msg.content);
    if (mediumWaitingHost !== undefined) {
      const waitingHostData = JSON.parse(mediumWaitingHost.content);
      channel.ack(mediumWaitingHost);
      channel.ack(msg);
      console.log(`Match found for Medium! Matched ${waitingHostData.id} and ${data.id}`);
      mediumWaitingHost = undefined;
    } else {
      console.log(`No match found for Medium. Host ${data.id} is waiting.`);
      mediumWaitingHost = msg;
    }
  });

  await channel.consume(hardQueue.queue, (msg) => {
    const data = JSON.parse(msg.content);
    if (hardWaitingHost !== undefined) {
      const waitingHostData = JSON.parse(hardWaitingHost.content);
      channel.ack(hardWaitingHost);
      channel.ack(msg);
      console.log(`Match found for Hard! Matched ${waitingHostData.id} and ${data.id}`);
      hardWaitingHost = undefined;
    } else {
      console.log(`No match found for Hard. Host ${data.id} is waiting.`);
      hardWaitingHost = msg;
    }
  });
};

findMatch();
