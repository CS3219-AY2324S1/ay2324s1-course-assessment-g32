import { axiosChatbot } from '../utils/axios';
import { Status } from '../constants';

const getConfig = () => {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
  };
};

export const getResponse = async (message) => {
  try {
    const data = { question: message };
    return await axiosChatbot.post('/get-response', data, getConfig());
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), {
        response: { status: Status.REQUEST_TIMEOUT },
        message: 'Network Error',
      });
    }
    console.log("error in api")
    throw err;
  }
};
