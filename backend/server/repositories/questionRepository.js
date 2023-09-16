const Question = require('../models/question');

const createQuestion = async (title, complexity, description, tags) => {
  try {
    const question = new Question({
      title: title,
      complexity: complexity,
      description: description,
      tags: tags
    });

    // Save the question to the database
    await question.save();

    return question;
  } catch (err) {
    throw err;
  }
};

const getQuestions = async () => {
  try {
    // Return all questions without the description
    return await Question.find({}, { description: 0 });
  } catch (err) {
    throw err;
  }
};

const getQuestionDetails = async (id) => {
  try {
    return await Question.findOne({ _id: id });
  } catch (err) {
    throw err;
  }
};

const findById = async (id) => {
  try {
    return await Question.find({ _id: id });
  } catch (err) {
    throw err;
  }
};

const findByTitle = async (title) => {
  try {
    return await Question.findOne({ title: title });
  } catch (err) {
    throw err;
  }
};

const findByIdAndTitle = async (id, title) => {
  try {
    return await Question.findOne({ $and: [{_id: id, title: title }]});
  } catch (err) {
    throw err;
  }
};

const editQuestion = async (id, title, complexity, description, tags) => {
  try {
    const fields = {
      title: title,
      complexity: complexity,
      description: description,
      tags: tags
    };
    return Question.updateOne({ _id: id }, { $set: fields });
  } catch (err) {
    throw err;
  }
};

const deleteQuestion = async (id) => {
  try {
    return await Question.deleteOne({ _id: id });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createQuestion,
  getQuestions,
  getQuestionDetails,
  findById,
  findByTitle,
  findByIdAndTitle,
  editQuestion,
  deleteQuestion
};
