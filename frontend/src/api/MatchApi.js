import { axiosMatch } from '../utils/axios';
import { Status } from '../constants';

const getConfig = (jwtToken) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + jwtToken,
    },
  };
};

export const joinQueue = async (jwt, queueName, sessionID) => {
  try {
    const data = {
      jwt: jwt,
      queueName: queueName,
      sessionID: sessionID,
    };
    return await axiosMatch.post('/join', data, getConfig(jwt));
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), {
        response: { status: Status.REQUEST_TIMEOUT },
        message: 'Network Error',
      });
    }
    throw err;
  }
};

export const exitQueue = async (jwt, queueName, sessionID) => {
  try {
    const data = {
      jwt: jwt,
      queueName: queueName,
      sessionID: sessionID,
    };
    return await axiosMatch.post('/exit', data, getConfig(jwt));
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), {
        response: { status: Status.REQUEST_TIMEOUT },
        message: 'Network Error',
      });
    }
    throw err;
  }
};
