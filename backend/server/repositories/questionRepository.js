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

const findById = async (id) => {
  return await Question.find({ _id: id });
}

const editQuestion = async (id, title, complexity, description) => {
  const fields = {
    title: title,
    complexity: complexity,
    description: description
  };
  return Question.updateOne({ _id: id }, { $set: fields });
}

const deleteQuestion = async (id) => {
  return await Question.deleteOne({ _id: id });
}

module.exports = {
  findByTitle,
  createQuestion,
  getQuestions,
  getQuestionDetails,
  findById,
  editQuestion,
  deleteQuestion
};
