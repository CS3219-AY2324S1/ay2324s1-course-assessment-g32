const logger = require('./Log');
const { createClient } = require('redis');

// Set expiry time to 2 hours if there is no activity
const expiry = {
  EX: 60*60*2,
};

class RedisMemory {
  constructor(url) {
    this.client = createClient(
      {
        url: url,
      }
    );
  };

  connect = async () => {
    await this.client.connect();
    logger.log('Connected to Redis');
  };

  handleRoomJoining = async (roomId, question, language, code, message, user) => {
    const data = await this.client.get(roomId);

    // Check if room exists
    if (data) {
      const parsedData = JSON.parse(data);

      if (!parsedData.users.includes(user)) {
        await parsedData.users.push(user);
      }

      await parsedData.messages.push(message);
      await this.client.set(roomId, JSON.stringify(parsedData), expiry);
      return parsedData;
    } else {
      const newData = {
        question: question,
        language: language,
        users: [user],
        code: code,
        result: '',
        messages: [message],
      };
      await this.client.set(roomId, JSON.stringify(newData), expiry);
      return newData;
    }
  };

  handleRoomTermination = async (roomId, user) => {
    const data = await this.client.get(roomId);
    if (data) {
      const parsedData = JSON.parse(data);

      // Remove user from room
      if (parsedData.users.includes(user)) {
        await parsedData.users.splice(parsedData.users.indexOf(user), 1);
      }

      // Delete room if no users are left
      if (parsedData.users.length === 0) {
        await this.client.del(roomId);
        logger.log(`Room ${roomId} has been deleted`);
      } else {
        await this.client.set(roomId, JSON.stringify(parsedData), expiry);
      }

    }
  };

  handleQuestionChange = async (roomId, question) => {
    const data = await this.client.get(roomId);
    if (data) {
      const parsedData = JSON.parse(data);
      parsedData.question = question;
      await this.client.set(roomId, JSON.stringify(parsedData), expiry);
    }
  };

  handleCodeChange = async (roomId, code) => {
    const data = await this.client.get(roomId);
    if (data) {
      const parsedData = JSON.parse(data);
      parsedData.code = code;
      await this.client.set(roomId, JSON.stringify(parsedData), expiry);
    }
  };

  handleLanguageChange = async (roomId, language) => {
    const data = await this.client.get(roomId);
    if (data) {
      const parsedData = JSON.parse(data);
      parsedData.language = language;
      await this.client.set(roomId, JSON.stringify(parsedData), expiry);
    }
  };

  handleResultChange = async (roomId, result) => {
    const data = await this.client.get(roomId);
    if (data) {
      const parsedData = JSON.parse(data);
      parsedData.language = result;
      await this.client.set(roomId, JSON.stringify(parsedData), expiry);
    }
  };

  handleButtonDisable = async (roomId, btnState) => {
    const data = await this.client.get(roomId);
    if (data) {
      const parsedData = JSON.parse(data);
      parsedData.btnState = await btnState;
      await this.client.set(roomId, JSON.stringify(parsedData), expiry);
    }
  };

  handleChatMessage = async (roomId, message) => {
    const data = await this.client.get(roomId);
    if (data) {
      const parsedData = JSON.parse(data);
      await parsedData.messages.push(message);
      await this.client.set(roomId, JSON.stringify(parsedData), expiry);
    }
  };
};

module.exports = {
  RedisMemory,
};
