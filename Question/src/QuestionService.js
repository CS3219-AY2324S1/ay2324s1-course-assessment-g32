const questionRepository = require('./QuestionRepository');
const { Status } = require('./constants');

exports.createQuestion = async (title, complexity, description, tags) => {
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

exports.getQuestions = async () => {
  try {
    return await questionRepository.getQuestions();
  } catch (err) {
    throw err;
  }
};

exports.getQuestionsByCriteria = async (complexity, tags) => {
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

exports.getQuestionDetails = async (id) => {
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

exports.getRandomQuestionByComplexity = async (complexity) => {
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

exports.editQuestion = async (id, title, complexity, description, tags) => {
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

exports.deleteQuestion = async (id) => {
  if (!id) {
    throw { status: 410, message: 'No question id is given' };
  }

  try {
    await questionRepository.deleteQuestion(id);
  } catch (err) {
    throw err;
  }
};

exports.appendQuestionTitle = async (attempts) => {
  try {
    const attemptsWithTitles = await Promise.all(attempts.map(async (entry) => {
      const question = await questionRepository.getQuestionDetails(entry.questionId);
      if (question === null) {
        return { ...entry, title: null };
      }
      return { ...entry, title: question.title };
    }));
    return attemptsWithTitles.filter((entry) => entry.title !== null);
  } catch (err) {
    throw err;
  }
};

exports.getQuestionCountByDifficulty = async (questionsId) => {
  try {
    const difficultyCount = await questionRepository.getQuestionsDifficultyCount(questionsId);
    const stats = difficultyCount.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
    }, { 'Easy': 0, 'Medium': 0, 'Hard': 0 });
    return stats;
  } catch (err) {
    throw err;
  }
};

exports.getQuestionStatistics = async () => {
  try {
    const difficultyCount = await questionRepository.getQuestionStatistics();
    const stats = difficultyCount.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
    }, { 'Easy': 0, 'Medium': 0, 'Hard': 0 });
    return stats;
  } catch (err) {
    throw err;
  }
};

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
