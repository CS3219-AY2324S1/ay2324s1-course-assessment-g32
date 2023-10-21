const questionService = require('./QuestionService');

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
  } catch (err) {
    res.status(err?.status || 500).json({ error: err?.message || err });
  }
};

// Define a controller function for getting all questions
const getAll = async (req, res) => {
  try {
    const questions = await questionService.getQuestions();
    res.json({ message: 'Questions retrieved successfully', questions });
  } catch (err) {
    res.status(err?.status || 500).json({ error: err?.message || err });
  }
};

// Define a controller function for getting all questions by complexity
const getAllByComplexity = async (req, res) => {
  try {
    const { complexity } = req.query;
    const questions = await questionService.getQuestionsByComplexity(
      complexity
    );
    res.json({ message: 'Questions retrieved successfully', questions });
  } catch (err) {
    res.status(err?.status || 500).json({ error: err?.message || err });
  }
};

// Define a controller function for getting details for a question
const getQuestionDetails = async (req, res) => {
  try {
    const { id } = req.query;
    const question = await questionService.getQuestionDetails(id);
    res.json({ message: 'Question retrieved successfully', question });
  } catch (err) {
    res.status(err?.status || 500).json({ error: err?.message || err });
  }
};

// Define a controller function for getting a random question by criteria
const getRandomQuestionByCriteria = async (req, res) => {
  try {
    const { complexity } = req.query;
    const question = await questionService.getRandomQuestionByComplexity(complexity);
    res.json({ message: 'Question retrieved successfully', question });
  } catch (err) {
    res.status(err?.status || 500).json({ error: err?.message || err });
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
  } catch (err) {
    res.status(err?.status || 500).json({ error: err?.message || err });
  }
};

// Define a controller function for deleting a question
const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.query;
    const question = await questionService.deleteQuestion(id);
    res.json({ message: 'Question deleted successfully', question });
  } catch (err) {
    res.status(err?.status || 500).json({ error: err?.message || err });
  }
};

module.exports = {
  create,
  getAll,
  getAllByComplexity,
  getQuestionDetails,
  getRandomQuestionByCriteria,
  edit,
  deleteQuestion,
};
