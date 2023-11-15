const axios = require('axios');
const env = require('../loadEnvironment');

const questionRootUrl = env.QUESTION_URL + '/question';

const getConfig = (jwtToken) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': jwtToken,
    },
  };
};

const appendQuestionTitle = async (jwtToken, attempts) => {
  try {
    const data = { attempts: attempts };
    const response = await axios.post(
      questionRootUrl + '/append-question-title',
      data,
      getConfig(jwtToken),
    );
    return response;
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

const getQuestionDifficultyCount = async (jwtToken, questionsId) => {
  try {
    const data = { questionsId: questionsId };
    const response = await axios.post(
      questionRootUrl + '/count-by-difficulty',
      data,
      getConfig(jwtToken),
    );
    return response;
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

const getQuestionStatistics = async (jwtToken) => {
  try {
    const response = await axios.get(
      questionRootUrl + '/statistics',
      getConfig(jwtToken),
    );
    return response;
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

module.exports = {
  appendQuestionTitle,
  getQuestionDifficultyCount,
  getQuestionStatistics,
};
