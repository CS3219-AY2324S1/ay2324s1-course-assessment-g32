const fs = require('fs');
const { spawn } = require('child_process');
const { MAX_EXECUTION_TIME, TIMEOUT_ERROR } = require('./constants');
const logger = require('./Log');

const executeScript = (scriptPath, childProcess) => {
  return new Promise((resolve, reject) => {
    const scriptTimeout = setTimeout(() => {
      logger.error('Script execution timed out. Killing the script...');
      childProcess.kill('SIGINT'); // Send an interrupt signal to the Python process
      resolve(
        `${TIMEOUT_ERROR}: Your program has timed out. Please try again.`
      );
    }, MAX_EXECUTION_TIME);

    const output = [];
    let errorOutput = '';

    childProcess.stdout.on('data', (data) => {
      output.push(data.toString());
    });

    childProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    childProcess.on('exit', (code) => {
      clearTimeout(scriptTimeout);
      if (code === 0) {
        resolve(output.join(''));
      } else {
        resolve(errorOutput);
      }
      fs.unlinkSync(scriptPath);
    });
  });
};

// Execute python code
const executePython = async (req, res) => {
  try {
    const pythonCode = req.body.code;
    const scriptPath = 'temp_script.py';
    fs.writeFileSync(scriptPath, pythonCode); // Write the code to a temporary python file

    const pythonProcess = spawn('python', [scriptPath]); // Command to execute the script
    const result = await executeScript(scriptPath, pythonProcess);

    logger.logSuccess("Program executed successfully.");

    res.json({ output: result });
  } catch (err) {
    logger.error(err);
  }
};

const executeJava = async (req, res) => {
  try {
    const javaCode = req.body.code;
    const javaFilename = 'Main.java';
    const javaClassName = 'Main';

    // Write the Java source code to a .java file
    fs.writeFileSync(javaFilename, javaCode);

    // Compile the Java source code
    const compileProcess = spawn('javac', [javaFilename]);
    const compileResult = await executeScript(javaFilename, compileProcess);

    if (compileResult.includes('error')) {
      logger.error('Compilation failed.');
      res.json({ output: compileResult });
    } else {
      logger.logSuccess("Program compiled successfully.");

      const javaProcess = spawn('java', [javaClassName]);
      const result = await executeScript(javaClassName + '.class', javaProcess);

      logger.logSuccess("Program executed successfully.");

      res.json({ output: result });
    }
  } catch (err) {
    logger.error(err);
  }
};

const executeJs = async (req, res) => {
  try {
    const javascriptCode = req.body.code;
    const scriptPath = 'temp_script.js';
    fs.writeFileSync(scriptPath, javascriptCode); // Write the code to a temporary javascript file

    const jsProcess = spawn('node', [scriptPath]); // Command to execute the script
    const result = await executeScript(scriptPath, jsProcess);

    logger.logSuccess("Program executed successfully.");

    res.json({ output: result });
  } catch (err) {
    logger.error(err);
  }
};

module.exports = {
  executePython,
  executeJava,
  executeJs,
};