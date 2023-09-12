import axios from 'axios';

export const createQuestion = async (title, complexity, description) => {
  const questionData = {
    title: title,
    complexity: complexity,
    description: description
  };
  return axios.post("http://localhost:3000/question/create", questionData, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const getQuestions = async () => {
  return axios.get("http://localhost:3000/question/getAll")
}

export const getQuestionDetails = async (questionId) => {
  return axios.get('http://localhost:3000/question/getQuestionDetails', {
     params: {
       id: questionId
     }
   })
}

export const editQuestion = async (id, title, complexity, description) => {
  const questionData = {
    id: id,
    title: title,
    complexity: complexity,
    description: description
  };
  return axios.post("http://localhost:3000/question/edit", questionData, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}