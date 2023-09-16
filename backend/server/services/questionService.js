const questionRepository = require('../repositories/questionRepository');

const createQuestion = async (title, complexity, description, tags) => {
  try {
    const innerText = description.replace(/<[^>]+>|\s+/g, '');
    // Check for missing inputs
    if (!title || !complexity || !innerText) {
      throw { status: 400, message: 'Missing inputs' };
    }

    // Check for existing duplicate titles
    const isDuplicateTitle = await questionRepository.findByTitle(title);
    if (isDuplicateTitle) {
      throw { status: 409, message: 'Question title already exist' };
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

    // Check for duplicate titles - not current
    const isCurrent = await questionRepository.findByIdAndTitle(id, title);
    const isDuplicateTitle = await questionRepository.findByTitle(title);
    if (!isCurrent && isDuplicateTitle) {
      throw { status: 409, message: `Question title already exist` };
    }

    // Check for missing inputs
    const innerText = description.replace(/<[^>]+>|\s+/g, '');
    if (!title || !complexity || !innerText) {
      throw { status: 400, message: 'Missing inputs' };
    }
    
    const question = await questionRepository.editQuestion(id, title, complexity, description, tags);
    return question;
  } catch (err) {
    throw err;
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
