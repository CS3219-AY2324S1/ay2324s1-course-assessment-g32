import axios from 'axios';
import { toast } from 'react-toastify';

const rootUrl = 'http://localhost:3000/question';

export const createQuestion = async (title, complexity, description) => {
  const questionData = {
    title: title,
    complexity: complexity,
    description: description
  };
  return axios.post(rootUrl + "/create", questionData, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
};

export const getQuestions = async () => {
  try {
    const response = await axios.get(rootUrl + "/getAll");
    return response.data.questions;
  } catch (error) {
    toast.error('Server Error: ' + error.response.data.error, {
      position: toast.POSITION.BOTTOM_RIGHT
    });
    throw error; // Re-throw the error to propagate it further if needed
  }
};

export const getQuestionDetails = async (questionId) => {
  return axios.get(rootUrl + "/getQuestionDetails", {
    params: {
      id: questionId
    }
  });
};

export const editQuestion = async (id, title, complexity, description) => {
  const questionData = {
    id: id,
    title: title,
    complexity: complexity,
    description: description
  };
  return axios.post(rootUrl + '/edit', questionData, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const deleteQuestion = async (id) => {
  return axios.delete(rootUrl + '/delete', {
    params: {
      id: id
    }
  });
};
