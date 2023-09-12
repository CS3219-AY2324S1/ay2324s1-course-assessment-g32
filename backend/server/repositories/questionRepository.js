const Question = require('../models/question');

const findByTitle = async (title) => {
  return await Question.findOne({ title });
}

const createQuestion = async (title, complexity, description) => {
  try {
    const question = new Question({
      title: title,
      complexity: complexity,
      description: description
    });

    // Save the question to the database
    await question.save();

    return question;
  } catch (err) {
    throw err;
  }
}

const getQuestions = async () => {
  // Return all questions without the description
  return await Question.find({}, { description: 0 });
}

const getQuestionDetails = async (id) => {
  return await Question.findOne({ _id: id });
}

module.exports = {
  findByTitle,
  createQuestion,
  getQuestions,
  getQuestionDetails
};
