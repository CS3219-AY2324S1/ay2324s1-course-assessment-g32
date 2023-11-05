const questionRepository = require('./QuestionRepository');
const { Status } = require('./constants');

const missingInputsThrowsValidationError = (title, complexity, description) => {
  const innerText = description.replace(/<[^>]+>|\s+/g, '');
  if (!title || !complexity || !innerText) {
    throw { status: Status.BAD_REQUEST, message: 'Missing inputs' };
  }
};

const duplicateTitleThrowsDuplicateError = async (id, title) => {
  // id == null then simply check if title exist, else cross-check id
  const isDuplicateTitle = await questionRepository.findByTitle(title);
  if (isDuplicateTitle && !isDuplicateTitle._id.equals(id)) {
    throw { status: Status.CONFLICT, message: 'Question title already exist' };
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

const getQuestionsByCriteria = async (complexity, tags) => {
  try {
    if (tags.length === 1 && tags[0] === 'All') {
      return await questionRepository.getQuestionsByComplexity(complexity);
    } else {
      return await questionRepository.getQuestionsByCriteria(complexity, tags);
    }
  } catch (err) {
    throw err;
  }
};

const getQuestionDetails = async (id) => {
  try {
    const question = await questionRepository.getQuestionDetails(id);
    if (!question) {
      throw { status: Status.GONE, message: 'Question does not exist' };
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
      throw { status: Status.GONE, message: 'Question does not exist' };
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
      throw { status: Status.GONE, message: 'Question does not exist' };
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
  if (!id) {
    throw { status: 410, message: 'No question id is given' };
  }

  try {
    await questionRepository.deleteQuestion(id);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createQuestion,
  getQuestions,
  getQuestionsByCriteria,
  getQuestionDetails,
  getRandomQuestionByComplexity,
  editQuestion,
  deleteQuestion,
};
