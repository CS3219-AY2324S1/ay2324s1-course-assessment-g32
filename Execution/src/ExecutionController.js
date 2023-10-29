const { PythonShell } = require('python-shell');
const { exec } = require('child_process');

// execute python
const executePython = async (req, res) => {
  try {
    const pythonCode = req.body.code;

    exec(`python -c "${pythonCode.replace(/"/g, '\\"')}"`, (error, stdout, stderr) => {
      if (error) {
        res.json({ output: stderr });
      } else {
        res.json({ output: stdout });
      }
    });
  } catch (err) {
    console.log(err);
  };
};

// execute java
const executeJava = async (req, res) => {
  try {
    console.log(req.body)
    res.json({ message: "java code executed"})
  } catch (err) {
    throw err;
  };
};

// execute cpp
const executeCpp = async (req, res) => {
  try {
    console.log(req.body)
    res.json({ message: "cpp code executed"})
  } catch (err) {
    throw err;
  };
};

// // execute js
// const capturedLogs = [];

// // Intercept console.log and redirect it to an array
// const originalLog = console.log;
// console.log = function () {
//   capturedLogs.push(Array.from(arguments));
//   originalLog.apply(console, arguments);
// };

const executeJs = async (req, res) => {
  try {
    const JScode = req.body.code;
    // console.log("printing js code:", JScode)
    const result = eval(JScode);

    // if (capturedLogs.length() !== 0) {

    // }
    // console.log("printing result from eval: ", result)
    res.json({ output: result });
  } catch (err) {
    console.log(err);
  };
};

module.exports = {
  executePython,
  executeJava,
  executeCpp,
  executeJs,
};
