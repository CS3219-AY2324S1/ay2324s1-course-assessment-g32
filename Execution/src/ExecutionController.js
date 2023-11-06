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

    res.json({ output: result });
  } catch (err) {
    logger.log(err);
  }
};

const executeJava = async (req, res) => {
  try {
    const maxExecutionTime = 5000; // 5 seconds
    const javaCode = req.body.code;
    const javaFilename = 'Main.java';
    const javaClassName = 'Main';

    // Write the Java source code to a .java file
    fs.writeFileSync(javaFilename, javaCode);

    // Compile the Java source code
    const compileProcess = spawn('javac', [javaFilename]);

    compileProcess.on('error', (err) => {
      res.json({ output: err.message });
    });

    compileProcess.on('exit', (code) => {
      if (code !== 0) {
        res.json({ output: `Compilation failed with code ${code}` });
      } else {
        // Execute the compiled Java program
        const executeProcess = spawn('java', [javaClassName]);
        let programOutput = '';

        executeProcess.stdout.on('data', (data) => {
          programOutput += data.toString();
        });

        executeProcess.stderr.on('data', (data) => {
          res.json({ output: data.toString() });
        });

        executeProcess.on('error', (err) => {
          res.json({ output: err.message });
        });

        executeProcess.on('exit', (code) => {
          clearTimeout(timeout);

          if (code !== 0) {
            logger.log('Java program timedout');
            res.json({ output: `Timeout: Your code ran longer than 5 seconds.` });
          } else {
            logger.log('Java program executed successfully:');
            fs.unlinkSync(javaFilename);
            fs.unlinkSync('Main.class');
            res.json({ output: programOutput });
          }
        });

        // Set a timeout to kill the script if it runs for too long
        const timeout = setTimeout(() => {
          logger.error('Script execution timed out. Killing the script...');
          executeProcess.kill();
        }, maxExecutionTime);
      }
    });
  } catch (err) {
    logger.log(err);
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
    const result = await executeScript(scriptPath, jsProcess);

    res.json({ output: result });
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
