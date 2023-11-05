const fs = require('fs');
const { exec, spawn } = require('child_process');
const { MAX_EXECUTION_TIME, TIMEOUT_ERROR } = require('./constants');
const logger = require('./Log');

// Execute python code
const executePython = (req, res) => {
  try {
    const pythonCode = req.body.code;
    const scriptPath = 'temp_script.py';
    fs.writeFileSync(scriptPath, pythonCode); // Write the code to a temporary python file

    const pythonProcess = spawn('python', [scriptPath]); // Command to execute the script
    let hasResponded = false;

    const scriptTimeout = setTimeout(() => {
      logger.error('Python script execution timed out. Killing the script...');
      pythonProcess.kill('SIGINT'); // Send an interrupt signal to the Python process
      if (!hasResponded) {
        hasResponded = true;
        res.json({
          output: `${TIMEOUT_ERROR}: Your program has timed out. Please try again.`,
        });
      }
    }, MAX_EXECUTION_TIME);

    const output = [];
    let errorOutput = '';

    pythonProcess.stdout.on('data', (data) => {
      output.push(data.toString());
    });

    pythonProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    pythonProcess.on('exit', (code) => {
      clearTimeout(scriptTimeout);

      if (!hasResponded) {
        hasResponded = true;
        if (code === 0) {
          res.json({ output: output.join('') });
        } else {
          res.json({ output: errorOutput });
        }
      }

      fs.unlinkSync(scriptPath);
    });
  } catch (err) {
    logger.log(err);
  }
};

// execute java
const executeJava = async (req, res) => {
  try {
    console.log(req.body);
    res.json({ message: 'java code executed' });
  } catch (err) {
    throw err;
  }
};

// execute cpp
const executeCpp = async (req, res) => {
  try {
    console.log(req.body);
    res.json({ message: 'cpp code executed' });
  } catch (err) {
    throw err;
  }
};

const executeJs = async (req, res) => {
  try {
    const javascriptCode = req.body.code;
    const scriptPath = 'temp_script.js';
    fs.writeFileSync(scriptPath, javascriptCode); // Write the code to a temporary javascript file

    const jsProcess = spawn('node', [scriptPath]); // Command to execute the script
    let hasResponded = false;

    const scriptTimeout = setTimeout(() => {
      logger.error('Javascript script execution timed out. Killing the script...');
      jsProcess.kill('SIGINT'); // Send an interrupt signal to the Python process
      if (!hasResponded) {
        hasResponded = true;
        res.json({
          output: `${TIMEOUT_ERROR}: Your program has timed out. Please try again.`,
        });
      }
    }, MAX_EXECUTION_TIME);

    const output = [];
    let errorOutput = '';

    jsProcess.stdout.on('data', (data) => {
      output.push(data.toString());
    });

    jsProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    jsProcess.on('exit', (code) => {
      clearTimeout(scriptTimeout);

      if (!hasResponded) {
        hasResponded = true;
        if (code === 0) {
          res.json({ output: output.join('') });
        } else {
          res.json({ output: errorOutput });
        }
      }

      fs.unlinkSync(scriptPath);
    });
  } catch (err) {
    logger.log(err);
  }
};

module.exports = {
  executePython,
  executeJava,
  executeCpp,
  executeJs,
};
