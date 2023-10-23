import axios from 'axios';
const env = require('../loadEnvironment');

const questionRootUrl = env.QUESTION_URL + '/question';

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
      questionRootUrl + '/create',
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
    const response = await axios.get(questionRootUrl + '/getAll', getConfig(jwtToken));
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
      questionRootUrl + '/getQuestionDetails',
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
      questionRootUrl + '/edit',
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
    const response = await axios.delete(questionRootUrl + '/delete', config);
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

export const appendQuestionTitle = async (jwtToken, attempts) => {
  try {
    const data = { attempts: attempts };
    const response = await axios.post(
      questionRootUrl + '/appendQuestionTitle',
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
