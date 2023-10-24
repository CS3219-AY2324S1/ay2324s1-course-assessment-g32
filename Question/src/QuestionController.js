const questionService = require('./QuestionService');
const logger = require('./Log.js');

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
    res.json({ message: 'Question created successfully', question });
    logger.logSuccess('Question created');
  } catch (err) {
    res.status(err?.status || 500).json({ error: err?.message || err });
    logger.error('Cannot create question:', err?.message || err);
  }
};

// Define a controller function for getting all questions
const getAll = async (req, res) => {
  try {
    const questions = await questionService.getQuestions();
    res.json({ message: 'Questions retrieved successfully', questions });
    logger.logSuccess('Questions retrieved');
  } catch (err) {
    res.status(err?.status || 500).json({ error: err?.message || err });
    logger.error('Cannot retrieve questions:', err?.message || err);
  }
};

// Define a controller function for getting details for a question
const getQuestionDetails = async (req, res) => {
  try {
    const { id } = req.query;
    const question = await questionService.getQuestionDetails(id);
    res.json({ message: 'Question retrieved successfully', question });
    logger.logSuccess('Retrieved details for question', id);
  } catch (err) {
    res.status(err?.status || 500).json({ error: err?.message || err });
    logger.error('Cannot get question details:', err?.message || err);
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
    res.json({ message: 'Question edited successfully', question });
    logger.logSuccess('Edited question', id);
  } catch (err) {
    res.status(err?.status || 500).json({ error: err?.message || err });
    logger.error('Cannot edit question:', err?.message || err);
  }
};

// Define a controller function for deleting a question
const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.query;
    const question = await questionService.deleteQuestion(id);
    res.json({ message: 'Question deleted successfully', question });
    logger.logSuccess('Deleted question', id);
  } catch (err) {
    res.status(err?.status || 500).json({ error: err?.message || err });
    logger.error('Cannot delete question:', err?.message || err);
  }
};

module.exports = {
  create,
  getAll,
  getQuestionDetails,
  edit,
  deleteQuestion,
};
