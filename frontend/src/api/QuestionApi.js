import axios from 'axios';

const rootUrl = 'http://localhost:3000/question';

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};

export const createQuestion = async (title, complexity, description, tags) => {
  try {
    const questionData = {
      title: title,
      complexity: complexity,
      description: description,
      tags: tags
    };
    return await axios.post(rootUrl + "/create", questionData, config);
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), { response: { status: 408 }, message: 'Network Error' });
    }
    throw err;
  }
};

export const getQuestions = async () => {
  try {
    const response = await axios.get(rootUrl + "/getAll");
    return response.data.questions;
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), { response: { status: 408 }, message: 'Network Error' });
    }
    throw err;
  }
};

export const getQuestionDetails = async (questionId) => {
  try {
    const questionDetails = await axios.get(rootUrl + "/getQuestionDetails", {
      params: {
        id: questionId
      }
    });
    return questionDetails.data.question;
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), { response: { status: 408 }, message: 'Network Error' });
    }
    throw err;
  }
};

export const editQuestion = async (id, title, complexity, description, tags) => {
  try {
    const questionData = {
      id: id,
      title: title,
      complexity: complexity,
      description: description,
      tags: tags
    };
    return await axios.post(rootUrl + '/edit', questionData, config);
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), { response: { status: 408 }, message: 'Network Error' });
    }
    throw err;
  }
};

export const deleteQuestion = async (id) => {
  try {
    const response = await axios.delete(rootUrl + '/delete', {
      params: {
        id: id
      }
    });
    return response;
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), { response: { status: 408 }, message: 'Network Error' });
    }
    throw err;
  }
};
