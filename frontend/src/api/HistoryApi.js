import axios from 'axios';
const env = require('../loadEnvironment');

const historyRootUrl = env.HISTORY_URL + '/history';

const getConfig = (jwtToken) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + jwtToken,
    },
  };
};

export const attemptQuestion = async (jwtToken, userId, questionId, code) => {
  try {
    const attemptData = {
      userId: userId,
      questionId: questionId,
      code: code,
    };
    return await axios.post(
      historyRootUrl + '/attempts',
      attemptData,
      getConfig(jwtToken)
    );
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), {
        response: { status: 408 },
        message: 'Network Error',
      });
    }
    throw err;
  }
};

export const getSubmissionHistory = async (jwtToken, userId) => {
  try {
    let config = getConfig(jwtToken);
    config.params = { userId: userId };
    return await axios.get(
      historyRootUrl + '/attempts',
      config
    );
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), {
        response: { status: 408 },
        message: 'Network Error',
      });
    }
    throw err;
  }
};
