const questionRepository = require('./QuestionRepository');

const missingInputsThrowsValidationError = (title, complexity, description) => {
  const innerText = description.replace(/<[^>]+>|\s+/g, '');
  if (!title || !complexity || !innerText) {
    throw { status: 400, message: 'Missing inputs' };
  }
};

const duplicateTitleThrowsDuplicateError = async (id, title) => {
  // id == null then simply check if title exist, else cross-check id
  const isDuplicateTitle = await questionRepository.findByTitle(title);
  if (isDuplicateTitle && !isDuplicateTitle._id.equals(id)) {
    throw { status: 409, message: 'Question title already exist' };
  }
};

const createQuestion = async (title, complexity, description, tags) => {
  try {
    missingInputsThrowsValidationError(title, complexity, description);
    await duplicateTitleThrowsDuplicateError(null, title);
    return await questionRepository.createQuestion(
      title,
      complexity,
      description,
      tags
    );
  } catch (err) {
    throw err;
  }
};

const getQuestions = async () => {
  try {
    return await questionRepository.getQuestions();
  } catch (err) {
    throw err;
  }
};

const getQuestionsByComplexity = async (complexity) => {
  try {
    return await questionRepository.getQuestionsByComplexity(complexity);
  } catch (err) {
    throw err;
  }
};

const getQuestionDetails = async (id) => {
  try {
    const question = await questionRepository.getQuestionDetails(id);
    if (!question) {
      throw { status: 410, message: 'Question does not exist' };
    }
    return question;
  } catch (err) {
    throw err;
  }
};

const getRandomQuestionByComplexity = async (complexity) => {
  try {
    const question = await questionRepository.getRandomQuestionByComplexity(
      complexity
    );
    if (!question) {
      throw { status: 410, message: 'Question does not exist' };
    }
    return question;
  } catch (err) {
    throw err;
  }
};

const editQuestion = async (id, title, complexity, description, tags) => {
  try {
    missingInputsThrowsValidationError(title, complexity, description);
    await duplicateTitleThrowsDuplicateError(id, title);

    const question = await questionRepository.findById(id);
    if (!question) {
      throw { status: 410, message: 'Question does not exist' };
    }

    return await questionRepository.editQuestion(
      id,
      title,
      complexity,
      description,
      tags
    );
  } catch (err) {
    throw err;
  }
};

const deleteQuestion = async (id) => {
  try {
    await questionRepository.deleteQuestion(id);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createQuestion,
  getQuestions,
  getQuestionsByComplexity,
  getQuestionDetails,
  getRandomQuestionByComplexity,
  editQuestion,
  deleteQuestion,
};
