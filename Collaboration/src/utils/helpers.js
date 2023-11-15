const { Language, Boilerplate } = require('../constants');

const getBoilerplate = (language) => {
  switch (language) {
    case Language.PYTHON:
      return Boilerplate.PYTHON;
    case Language.JAVA:
      return Boilerplate.JAVA;
    case Language.JS:
      return Boilerplate.JS;
    default:
      return Boilerplate.PYTHON;
  }
};

module.exports = {
  getBoilerplate,
}
