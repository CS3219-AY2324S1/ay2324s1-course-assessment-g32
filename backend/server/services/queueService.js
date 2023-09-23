const amqp = require('amqplib');

rabbitMQ = {
  url: 'amqp://localhost',
  exchange: 'findOpponent',
};

class QueueService {
  channel;

  async createChannel () {
    const connection = await amqp.connect(rabbitMQ.url);
    this.channel = await connection.createChannel();
  };

  async joinQueue (complexityType, id) {
    if (!this.channel) {
      await this.createChannel();
    }

    await this.channel.assertExchange(rabbitMQ.exchange, 'direct');

    await this.channel.publish(rabbitMQ.exchange, complexityType,
      Buffer.from(JSON.stringify({
        complexityType: complexityType,
        id: id,
        dateTime: new Date(),
      }))
    );
  };
};

module.exports = QueueService;
