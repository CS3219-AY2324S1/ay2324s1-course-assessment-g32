const PythonShell = require('python-shell')

// execute python
const executePython = async (req, res) => {
  try {
    console.log(req.body)
    res.json({ message: "python code executed"})
  } catch (err) {
    throw err;
  }
};

// execute java
const executeJava = async (req, res) => {
  try {
    console.log(req.body)
    res.json({ message: "java code executed"})
  } catch (err) {
    throw err;
  }
};

// execute cpp
const executeCpp = async (req, res) => {
  try {
    console.log(req.body)
    res.json({ message: "cpp code executed"})
  } catch (err) {
    throw err;
  }
};

// execute js
const executeJs = async (req, res) => {
  try {
    console.log(req.body)
    res.json({ message: "js code executed"})
  } catch (err) {
    throw err;
  }
};

module.exports = {
  executePython,
  executeJava,
  executeCpp,
  executeJs,
};
