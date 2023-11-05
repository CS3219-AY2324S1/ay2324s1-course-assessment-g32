const { exec } = require('child_process');

// execute python
const executePython = async (req, res) => {
  try {
    const maxExecutionTime = 5000; // 5 seconds
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
    }, maxExecutionTime);

  } catch (err) {
    console.log(err);
  };
};

// execute java
const executeJava = async (req, res) => {
  try {
    const maxExecutionTime = 5000; // 5 seconds
    const javaCode = req.body.code;

    // Write the Java source code to a .java file
    const javaFilename = 'Main.java';

    const fs = require('fs');
    fs.writeFileSync(javaFilename, javaCode);

    // Compile the Java source code
    exec(`javac ${javaFilename}`, (error, stdout, stderr) => {
      if (error) {
          res.json({ output: error.message });
      } else {
        // Execute the compiled Java program
        const scriptProcess = exec(`java Main`, (error, stdout, stderr) => {
          clearTimeout(timeout);
          if (error) {
              res.json({ output: error.message });
          } else {
            console.log('Java program executed successfully:');
            res.json({ output: stdout });
          }
        });

        // Set a timeout to kill the script if it runs for too long
        const timeout = setTimeout(() => {
          console.error('Java script execution timed out. Killing the script...');
          scriptProcess.kill();
        }, maxExecutionTime);

      }
    });
  } catch (err) {
    console.log(err);
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
