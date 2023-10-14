const questionModel = require('../model/QuestionModel');

const createQuestion = async (title, complexity, description, tags) => {
  try {
    const question = new questionModel({
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
    return await questionModel.find({}, { description: 0 });
  } catch (err) {
    throw err;
  }
};

const getQuestionDetails = async (id) => {
  try {
    return await questionModel.findOne({ _id: id });
  } catch (err) {
    throw err;
  }
};

const findById = async (id) => {
  try {
    return await questionModel.findOne({ _id: id });
  } catch (err) {
    throw err;
  }
};

const findByTitle = async (title) => {
  try {
    return await questionModel.findOne({ title: title });
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
    return questionModel.updateOne({ _id: id }, { $set: fields });
  } catch (err) {
    throw err;
  }
};

const deleteQuestion = async (id) => {
  try {
    return await questionModel.deleteOne({ _id: id });
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
  editQuestion,
  deleteQuestion
};
