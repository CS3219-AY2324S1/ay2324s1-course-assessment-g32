const { PythonShell } = require('python-shell');
const JSCPP = require('JSCPP');
const { exec } = require('child_process');

// execute python
const executePython = async (req, res) => {
  // Set a maximum execution time (in milliseconds)
  const maxExecutionTime = 5000; // 5 seconds

  try {
    const pythonCode = req.body.code;

    const scriptProcess = exec(`python -c "${pythonCode.replace(/"/g, '\\"')}"`, (error, stdout, stderr) => {
      clearTimeout(timeout); // Clear the timeout since the script completed
      if (error) {
        res.json({ output: stderr });
      } else {
        res.json({ output: stdout });
      }
    });

    // Set a timeout to kill the script if it runs for too long
    const timeout = setTimeout(() => {
      console.error('Python script execution timed out. Killing the script...');
      scriptProcess.kill();
      // res.json({ output: "TimeoutError" });
    }, maxExecutionTime);

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

const executeJs = async (req, res) => {
  try {
    const maxExecutionTime = 5000; // 5 seconds
    const javascriptCode = req.body.code;

    const scriptProcess = exec(`node -e "${javascriptCode.replace(/"/g, '\\"')}"`, (error, stdout, stderr) => {
      clearTimeout(timeout); // Clear the timeout since the script completed
      if (error) {
        res.json({ output: stderr });
      } else {
        res.json({ output: stdout });
      }
    });

    const timeout = setTimeout(() => {
      console.error('JavaScript script execution timed out. Killing the script...');
      scriptProcess.kill();
      // res.json({ output: "TimeoutError" });
    }, maxExecutionTime);

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
