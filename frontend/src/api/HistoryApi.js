import { axiosHistory } from '../utils/axios';
import { Status } from '../constants';

const getConfig = (jwtToken) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + jwtToken,
    },
  };
};

export const attemptQuestion = async (jwtToken, userId, questionId, code, language, result) => {
  try {
    const attemptData = {
      userId: userId,
      questionId: questionId,
      code: code,
      language: language,
      result: result,
    };
    return await axiosHistory.post('/attempt', attemptData, getConfig(jwtToken));
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

export const getSubmissionHistory = async (jwtToken, userId) => {
  try {
    let config = getConfig(jwtToken);
    config.params = { userId: userId };
    return await axiosHistory.get('/attempts', config);
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

export const getHeatMapData = async (jwtToken, userId) => {
  try {
    let config = getConfig(jwtToken);
    config.params = { userId: userId };
    return await axiosHistory.get('/heatmap', config);
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

export const getPieChartData = async (jwtToken, userId) => {
  try {
    let config = getConfig(jwtToken);
    config.params = { userId: userId };
    return await axiosHistory.get('/piechart', config);
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

export const getAttempt = async (jwtToken, attemptId) => {
  try {
    let config = getConfig(jwtToken);
    config.params = { attemptId: attemptId };
    return await axiosHistory.get('/attempt', config);
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

export const getAttemptsByQuestionAndUser = async (jwtToken, questionId, userId) => {
  try {
    let config = getConfig(jwtToken);
    config.params = { questionId: questionId, userId: userId };
    return await axiosHistory.get('/attempts', config);
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
