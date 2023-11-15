import { axiosQuestion } from '../utils/axios';
import { Status } from '../constants';

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
    return await axiosQuestion.post('/',questionData,getConfig(jwtToken));
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

export const getQuestions = async (jwtToken) => {
  try {
    const response = await axiosQuestion.get('/all', getConfig(jwtToken));
    return response.data.questions;
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

export const getQuestionsByCriteria = async (complexity, tags, jwtToken) => {
  try {
    let config = getConfig(jwtToken);
    config.params = { complexity: complexity, tags: tags };
    const response = await axiosQuestion.get('/by-criteria', config);
    return response.data.questions;
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

export const getQuestionDetails = async (questionId, jwtToken) => {
  try {
    let config = getConfig(jwtToken);
    config.params = { id: questionId };
    const questionDetails = await axiosQuestion.get('/', config);
    return questionDetails.data.question;
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

export const getRandomQuestionByCriteria = async (complexity, jwtToken) => {
  try {
    let config = getConfig(jwtToken);
    config.params = { complexity: complexity };
    const questionDetails = await axiosQuestion.get('/random', config);
    return questionDetails.data.question;
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
    return await axiosQuestion.put('/', questionData, getConfig(jwtToken));
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

export const deleteQuestion = async (id, jwtToken) => {
  try {
    let config = getConfig(jwtToken);
    config.params = { id: id };
    const response = await axiosQuestion.delete('/', config);
    return response;
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
