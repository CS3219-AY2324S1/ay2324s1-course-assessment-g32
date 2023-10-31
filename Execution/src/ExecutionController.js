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
      res.json({ output: "TimeoutError" });
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

    var code = "#include <iostream>"
            + "using namespace std;"
            + "int main() {"
            + "    int a;"
            + "    cin >> a;"
            + "    cout << a << endl;"
            + "    return 0;"
            + "}"
    ;

    var input = "4321";
    var exitcode = JSCPP.run(code, input);
    console.info("program exited with code " + exitcode);

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
