const questionRepository = require('../repositories/questionRepository');

const createQuestion = async (title, complexity, description, tags) => {
  try {

    const innerText = description.replace(/<[^>]+>/g, '');
    // Check for missing inputs
    if (!title || !complexity || !innerText) {
      throw { status: 400, message: 'Missing inputs' };
    }

    const question = await questionRepository.createQuestion(title, complexity, description, tags);
    return question;
  } catch (err) {
    throw err;
  }
};

const getQuestions = async () => {
  try {
    const questions = await questionRepository.getQuestions();
    return questions;
  } catch (err) {
    throw err;
  }
};

const getQuestionDetails = async (id) => {
  try {
    const question = await questionRepository.getQuestionDetails(id);
    if (!question) {
      throw { status: 400, message: 'Question does not exist' };
    }

    return question;
  } catch (err) {
    throw { status: 400, message: 'Question does not exist' };
  }
};

const editQuestion = async (id, title, complexity, description, tags) => {
  try {
    // Check if id does not exist in database
    const existingQuestion = await questionRepository.findById(id);
    if (!existingQuestion) {
      throw { status: 400, message: 'Question does not exist' };
    }

    const innerText = description.replace(/<[^>]+>/g, '');

    // Check for missing inputs
    if (!title || !complexity || !innerText) {
      throw { status: 400, message: 'Missing inputs' };
    }

    const question = await questionRepository.editQuestion(id, title, complexity, description, tags);
    return question;
  } catch (err) {
    throw { status: 400, message: err.message };
  }
};

const deleteQuestion = async (id) => {
  try {
    await questionRepository.deleteQuestion(id);
  } catch (err) {
    throw { status: 400, message: 'Question does not exist' };
  }
};

module.exports = {
  createQuestion,
  getQuestions,
  getQuestionDetails,
  editQuestion,
  deleteQuestion
};
