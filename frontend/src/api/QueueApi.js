import axios from 'axios';
const env = require("../loadEnvironment");

const rootUrl = env.SERVER_URL + '/queue';

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};

export const joinQueue = async (user, queueName) => {
  try {
    const data = {
      id: user.id,
      queueName: queueName
    };
    return await axios.post(rootUrl + "/join", data, config);
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), { response: { status: 408 }, message: 'Network Error' });
    }
    throw err;
  }
};

export const exitQueue = async (user, queueName) => {
  try {
    const data = {
      id: user.id,
      queueName: queueName
    };
    return await axios.post(rootUrl + "/exit", data, config);
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), { response: { status: 408 }, message: 'Network Error' });
    }
    throw err;
  }
};
