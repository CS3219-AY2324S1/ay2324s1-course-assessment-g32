const questionRepository = require('../repositories/questionRepository');

const missingInputsThrowsValidationError = (title, complexity, description) => {
  const innerText = description.replace(/<[^>]+>|\s+/g, '');
  if (!title || !complexity || !innerText) {
    throw { status: 400, message: 'Missing inputs' };
  }
}

const duplicateTitleThrowsDuplicateError = async (id, title) => {
  // id == null then simply check if title exist, else cross-check id
  const isDuplicateTitle = await questionRepository.findByTitle(title);
  if (!isDuplicateTitle) return;

  // Duplicate found, check if it is the same question
  if (!isDuplicateTitle._id.equals(id)) {
    throw { status: 409, message: `Question title already exist` };
  }
}

const createQuestion = async (title, complexity, description, tags) => {
  try {
    missingInputsThrowsValidationError(title, complexity, description);
    await duplicateTitleThrowsDuplicateError(null, title);

    const question = await questionRepository.createQuestion(title, complexity, description, tags);
    return question;
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

const getQuestionDetails = async (id) => {
  try {
    const question = await questionRepository.getQuestionDetails(id);
    if (!question) {
      throw { status: 400, message: 'Question does not exist' };
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
