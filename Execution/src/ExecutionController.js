const fs = require('fs');
const { spawn } = require('child_process');
const treeKill = require('tree-kill');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const {
  MAX_EXECUTION_TIME,
  TIMEOUT_ERROR,
  SIGNAL_TERMINATE,
  SUCCESS_CODE,
  SIGNAL_KILL,
} = require('./constants');
const logger = require('./Log');

const isCodeEmpty = (code) => {
  return !code.trim();
};

const handleEmptyCode = (res) => {
  logger.error('No code provided.');
  res.json({ output: 'No code provided.' });
};

const uniqueId = () => {
  return uuidv4();
};

const executeScript = (scriptPath, childProcess, executionDirectory = null) => {
  return new Promise((resolve, reject) => {
    const output = [];
    let errorOutput = '';

    childProcess.stdout.on('data', (data) => {
      output.push(data.toString());
    });

    childProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    childProcess.on('exit', async (code) => {
      clearTimeout(scriptTimeout);
      if (code === SUCCESS_CODE) {
        resolve(output.join(''));
      } else {
        resolve(errorOutput);
      }

      // Cleanup of temporary files/directories when process exits
      try {
        // Checks if the scriptPath is a file within a directory
        if (executionDirectory) {
          fs.unlinkSync(path.join(executionDirectory, scriptPath));
          logger.logSuccess('Temporary script removed.');

          // JAVA: Directory is not removed until after the .class file is executed
          if (scriptPath.endsWith('.class')) {
            await fs.promises.rmdir(executionDirectory, { recursive: true });
            logger.logSuccess('Temporary directory removed.');
          }
        } else {
          fs.unlinkSync(scriptPath);
          logger.logSuccess('Temporary script removed.');
        }
      } catch (error) {
        logger.error('Error during cleanup:', error);
      }
    });

    const scriptTimeout = setTimeout(() => {
      logger.error('Script execution timed out. Killing the script...');

      const childPid = childProcess.pid; // Get the PID of the child process

      // Kills all of the sub-processes of the child process
      const treeKillPromise = new Promise((resolve, reject) => {
        treeKill(childPid, SIGNAL_KILL, (err) => {
          if (err) {
            logger.error('Error while killing the process tree');
            reject(err);
          } else {
            logger.log('Sub-processes terminated successfully.');
            resolve();
          }
        });
      });

      // Wait for child's sub-proccesses to be killed before terminating child process
      treeKillPromise
        .then(() => {
          childProcess.kill(SIGNAL_TERMINATE); // Kill the child process (SIGTERM)
        })
        .catch((err) => {
          logger.error('Error during tree-kill');
        });

      resolve(
        `${TIMEOUT_ERROR}: Your program has timed out. Please try again.`
      );
    }, MAX_EXECUTION_TIME);
  });
};

// Execute python code
const executePython = async (req, res) => {
  try {
    const pythonCode = req.body.code;

    // Use timestamp and unique UUID to generate a unique filename
    const timestamp = Date.now();
    const id = uniqueId();
    const scriptPath = `temp_script_${timestamp}_${id}.py`;

    // Check if pythonCode is empty
    if (isCodeEmpty(pythonCode)) {
      handleEmptyCode(res);
      return;
    }

    fs.writeFileSync(scriptPath, pythonCode); // Write the code to a temporary python file

    const pythonProcess = spawn('python', [scriptPath]); // Command to execute the script
    const result = await executeScript(scriptPath, pythonProcess);

    logger.logSuccess('Program executed successfully.');

    res.json({ output: result });
  } catch (err) {
    logger.error(err);
  }
};

const executeJava = async (req, res) => {
  try {
    const javaCode = req.body.code;
    const javaClassName = 'Main';

    // Generate a unique temporary directory for each Java execution
    const timestamp = Date.now();
    const id = uniqueId();
    const executionDirectory = `Java_${timestamp}_${id}`;

    // Check if javaCode is empty
    if (isCodeEmpty(javaCode)) {
      handleEmptyCode(res);
      return;
    }

    // Create a temporary directory to store the Java source code
    fs.mkdirSync(executionDirectory);

    // Write the Java source code to a .java file within the temporary directory
    const javaFilename = `${javaClassName}.java`;
    const javaFilePath = `${executionDirectory}/${javaFilename}`;
    fs.writeFileSync(javaFilePath, javaCode);

    // Compile the Java source code using the Java source file within the execution directory
    const compileProcess = spawn('javac', [javaFilename], { cwd: executionDirectory });
    const compileResult = await executeScript(javaFilename, compileProcess, executionDirectory);

    if (compileResult.includes('error')) {
      logger.error('Compilation failed.');
      res.json({ output: compileResult });
      fs.rmdirSync(executionDirectory, { recursive: true });
    } else {
      logger.logSuccess('Program compiled successfully.');

      const javaProcess = spawn('java', [javaClassName], { cwd: executionDirectory });
      const result = await executeScript(javaClassName + '.class', javaProcess, executionDirectory);

      logger.logSuccess('Program executed successfully.');

      res.json({ output: result });
    }
  } catch (err) {
    logger.error(err);
  }
};

const executeJs = async (req, res) => {
  try {
    const javascriptCode = req.body.code;

    // Use timestamp and unique UUID to generate a unique filename
    const timestamp = Date.now();
    const id = uniqueId();
    const scriptPath = `temp_script_${timestamp}_${id}.js`;

    // Check if javascriptCode is empty
    if (isCodeEmpty(javascriptCode)) {
      handleEmptyCode(res);
      return;
    }

    fs.writeFileSync(scriptPath, javascriptCode); // Write the code to a temporary javascript file

    const jsProcess = spawn('node', [scriptPath]); // Command to execute the script
    const result = await executeScript(scriptPath, jsProcess);

    logger.logSuccess('Program executed successfully.');

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
