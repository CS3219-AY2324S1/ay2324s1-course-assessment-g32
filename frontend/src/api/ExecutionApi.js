import { axiosExecution } from '../utils/axios';

const getConfig = () => {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
  };
};

export const executeCode = async (language, code) => {
  const codeObject = { code: code };

  switch (language) {
    case 'Python':
      console.log("case python")
      return await executePython(codeObject);
    case 'Java':
      console.log("case java")
      return await executeJava(codeObject);
    case 'C++':
      console.log("case cpp")
      return await executeCpp(codeObject);
    case 'Javascript':
      console.log("case js")
      return await executeJs(codeObject);
    default:
      console.log("case python")
      return await executePython(codeObject);
  }
};

const executePython = async (codeObject) => {
  try {
    const response = await axiosExecution.post('/execute-python', codeObject, getConfig());
    return response.data.output;
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), {
        response: { status: 408 },
        message: 'Network Error',
      });
    }
    throw err;
  }
}

const executeJava = async (codeObject) => {
  try {
    const response = await axiosExecution.post('/execute-java', codeObject, getConfig());
    return response.data.output;
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), {
        response: { status: 408 },
        message: 'Network Error',
      });
    }
    throw err;
  }
};

const executeCpp = async (codeObject) => {
  try {
    const response = await axiosExecution.post('/execute-cpp', codeObject, getConfig());
    return response.data.output;
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), {
        response: { status: 408 },
        message: 'Network Error',
      });
    }
    throw err;
  }
};

const executeJs = async (codeObject) => {
  try {
    const response = await axiosExecution.post('/execute-js', codeObject, getConfig());
    console.log(response.data.output)
    return response.data.output;
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), {
        response: { status: 408 },
        message: 'Network Error',
      });
    }
    throw err;
  }
};
