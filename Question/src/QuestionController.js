const questionService = require('./QuestionService');
const { Status } = require('./constants');
const logger = require('./Log');

// Define a controller function for creating questions
const create = async (req, res) => {
  try {
    const { title, complexity, description, tags } = req.body;
    const question = await questionService.createQuestion(
      title,
      complexity,
      description,
      tags
    );
    logger.logSuccess('Question created');
    res.json({ message: 'Question created successfully', question });
  } catch (err) {
    logger.error('Cannot create question:', err?.message || err);
    res
      .status(err?.status || Status.INTERNAL_SERVER_ERROR)
      .json({ error: err?.message || err });
  }
};

// Define a controller function for getting all questions
const getAll = async (req, res) => {
  try {
    const questions = await questionService.getQuestions();
    logger.logSuccess('Questions retrieved');
    res.json({ message: 'Questions retrieved successfully', questions });
  } catch (err) {
    logger.error('Cannot retrieve questions:', err?.message || err);
    res
      .status(err?.status || Status.INTERNAL_SERVER_ERROR)
      .json({ error: err?.message || err });
  }
};

const getAllByCriteria = async (req, res) => {
  try {
    const { complexity, tags } = req.query;
    const questions = await questionService.getQuestionsByCriteria(complexity, tags);
    logger.logSuccess('Questions retrieved by criteria');
    res.json({ message: 'Questions retrieved successfully', questions });
  } catch (err) {
    logger.error('Cannot retrieve questions by criteria:', err?.message || err);
    res
      .status(err?.status || Status.INTERNAL_SERVER_ERROR)
      .json({ error: err?.message || err });
  }
};

// Define a controller function for getting details for a question
const getQuestionDetails = async (req, res) => {
  try {
    const { id } = req.query;
    const question = await questionService.getQuestionDetails(id);
    logger.logSuccess('Retrieved details for question', id);
    res.json({ message: 'Question retrieved successfully', question });
  } catch (err) {
    logger.error('Cannot get question details:', err?.message || err);
    res
      .status(err?.status || Status.INTERNAL_SERVER_ERROR)
      .json({ error: err?.message || err });
  }
};

// Define a controller function for getting a random question by criteria
const getRandomQuestionByCriteria = async (req, res) => {
  try {
    const { complexity } = req.query;
    const question = await questionService.getRandomQuestionByComplexity(complexity);
    logger.logSuccess('Retrieved random question by complexity');
    res.json({ message: 'Question retrieved successfully', question });
  } catch (err) {
    logger.error(
      'Cannot get random question by complexity:',
      err?.message || err
    );
    res
      .status(err?.status || Status.INTERNAL_SERVER_ERROR)
      .json({ error: err?.message || err });
  }
};

// Define a controller function for editing a question
const edit = async (req, res) => {
  try {
    const { id, title, complexity, description, tags } = req.body;
    const question = await questionService.editQuestion(
      id,
      title,
      complexity,
      description,
      tags
    );
    logger.logSuccess('Edited question', id);
    res.json({ message: 'Question edited successfully', question });
  } catch (err) {
    logger.error('Cannot edit question:', err?.message || err);
    res
      .status(err?.status || Status.INTERNAL_SERVER_ERROR)
      .json({ error: err?.message || err });
  }
};

// Define a controller function for deleting a question
const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.query;
    const question = await questionService.deleteQuestion(id);
    logger.logSuccess('Deleted question', id);
    res.json({ message: 'Question deleted successfully', question });
  } catch (err) {
    logger.error('Cannot delete question:', err?.message || err);
    res
      .status(err?.status || Status.INTERNAL_SERVER_ERROR)
      .json({ error: err?.message || err });
  }
};

// Define a controller function for appending question title
const appendQuestionTitle = async (req, res) => {
  try {
    const { attempts } = req.body;
    const attemptsWithTitles = await questionService.appendQuestionTitle(attempts);
    res.json({ message: 'Question title appended successfully', attemptsWithTitles });
  } catch (err) {
    res.status(err?.status || 500).json({ error: err?.message || err });
  }
};

const getQuestionDifficultyCount = async (req, res) => {
  try {
    const { questionsId } = req.body;
    const questionCountByDifficulty = await questionService.getQuestionCountByDifficulty(questionsId);
    res.json({ message: 'Question count by difficulty retrieved successfully', questionCountByDifficulty });
  } catch (err) {
    res.status(err?.status || 500).json({ error: err?.message || err });
  }
};

const getQuestionStatistics = async (req, res) => {
  try {
    const questionStatistics = await questionService.getQuestionStatistics();
    res.json({ message: 'Question statistics retrieved successfully', questionStatistics });
  } catch (err) {
    res.status(err?.status || 500).json({ error: err?.message || err });
  }
};


module.exports = {
  create,
  getAll,
  getAllByCriteria,
  getQuestionDetails,
  getRandomQuestionByCriteria,
  edit,
  deleteQuestion,
  appendQuestionTitle,
  getQuestionDifficultyCount,
  getQuestionStatistics,
};
