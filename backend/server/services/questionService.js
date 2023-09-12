const questionRepository = require('../repositories/questionRepository');

const createQuestion = async (title, complexity, description) => {
  try {
    // Check for missing inputs
    if (!title || !complexity || !description) {
      throw { status: 400, message: 'Missing inputs' };
    }

    // Check if a question with the same title already exists
    const existingQuestion = await questionRepository.findByTitle(title);
    if (existingQuestion) {
      throw { status: 400, message: 'Question already exists' };
    }

    const question = await questionRepository.createQuestion(title, complexity, description);

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
    console.error(err);
    throw err;
  }
}

const getQuestionDetails = async (id) => {
  try {
    const question = await questionRepository.getQuestionDetails(id);
    return question;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const editQuestion = async (id, title, complexity, description) => {
  try {
    // Check if id does not exist in database
    const existingQuestion = await questionRepository.findById(id);

    if (!existingQuestion) {
      throw { status: 400, message: 'Question does not exist, cannot be updated' };
    }

    // Check for missing inputs
    if (!title || !complexity || !description) {
      throw { status: 400, message: 'Missing inputs' };
    }
    const question = await questionRepository.editQuestion(id, title, complexity, description);
    return question;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createQuestion,
  getQuestions,
  getQuestionDetails,
  editQuestion
};
