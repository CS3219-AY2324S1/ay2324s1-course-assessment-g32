import { axiosExecution } from '../utils/axios';

const getConfig = (code) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Code': code,
    },
  };
};

export const executeCode = async (language, code) => {
  switch (language) {
    case 'Python':
      executePython(code);
      break;
    case 'Java':
      executeJava(code);
      break;
    case 'C++':
      executeCpp(code);
      break;
    default:
      executeJs(code);
  }
};

const executePython = async (code) => {
  try {
    const response = await axiosExecution.post('/execute-python', getConfig(code));
  } catch (err) {
    throw err;
  }
}

const executeJava = async (code) => {
  try {
    const response = await axiosExecution.post('/execute-java', getConfig(code));
  } catch (err) {
    throw err;
  }
};

const executeCpp = async (code) => {
  try {
    const response = await axiosExecution.post('/execute-cpp', getConfig(code));
  } catch (err) {
    throw err;
  }
};

const executeJs = async (code) => {
  try {
    const response = await axiosExecution.post('/execute-js', getConfig(code));
  } catch (err) {
    throw err;
  }
};
