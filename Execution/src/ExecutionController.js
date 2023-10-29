const { PythonShell } = require('python-shell');
const { exec } = require('child_process');

// execute python
const executePython = async (req, res) => {
  try {
    const pythonCode = req.body.code;

    exec(`python -c "${pythonCode.replace(/"/g, '\\"')}"`, (error, stdout, stderr) => {
      if (error) {
        console.log("code giving error");
        res.json({ output: stderr });
      } else {
        console.log("code executed");
        console.log(stdout);
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
