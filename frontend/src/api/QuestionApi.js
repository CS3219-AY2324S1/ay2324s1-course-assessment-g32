import axios from 'axios';
const env = require('../loadEnvironment');

const rootUrl = env.SERVER_URL + '/question';

const getConfig = (jwtToken) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + jwtToken,
    },
  };
};

export const createQuestion = async (
  title,
  complexity,
  description,
  tags,
  jwtToken
) => {
  try {
    const questionData = {
      title: title,
      complexity: complexity,
      description: description,
      tags: tags,
    };
    return await axios.post(
      rootUrl + '/create',
      questionData,
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

export const getQuestions = async (jwtToken) => {
  try {
    const response = await axios.get(rootUrl + '/getAll', getConfig(jwtToken));
    return response.data.questions;
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

export const getQuestionDetails = async (questionId, jwtToken) => {
  try {
    let config = getConfig(jwtToken);
    config.params = { id: questionId };
    const questionDetails = await axios.get(
      rootUrl + '/getQuestionDetails',
      config
    );
    return questionDetails.data.question;
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

export const editQuestion = async (
  id,
  title,
  complexity,
  description,
  tags,
  jwtToken
) => {
  try {
    const questionData = {
      id: id,
      title: title,
      complexity: complexity,
      description: description,
      tags: tags,
    };
    return await axios.post(
      rootUrl + '/edit',
      questionData,
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

export const deleteQuestion = async (id, jwtToken) => {
  try {
    let config = getConfig(jwtToken);
    config.params = { id: id };
    const response = await axios.delete(rootUrl + '/delete', config);
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
