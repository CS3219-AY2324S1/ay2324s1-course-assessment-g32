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

export const attemptQuestion = async (jwtToken, userId, questionId, code, language) => {
  try {
    const attemptData = {
      userId: userId,
      questionId: questionId,
      code: code,
      language: language,
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

export const getHeatMapData = async (jwtToken, userId) => {
  try {
    let config = getConfig(jwtToken);
    config.params = { userId: userId };
    return await axios.get(
      historyRootUrl + '/heatmap',
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

export const getPieChartData = async (jwtToken, userId) => {
  try {
    let config = getConfig(jwtToken);
    config.params = { userId: userId };
    return await axios.get(
      historyRootUrl + '/piechart',
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

export const getAttempt = async (jwtToken, attemptId) => {
  try {
    let config = getConfig(jwtToken);
    config.params = { attemptId: attemptId };
    return await axios.get(
      historyRootUrl + '/attempt',
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

export const getAttemptsByQuestionAndUser = async (jwtToken, questionId, userId) => {
  try {
    let config = getConfig(jwtToken);
    config.params = { questionId: questionId, userId: userId };
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