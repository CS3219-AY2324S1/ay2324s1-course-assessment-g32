import { axiosExecution } from '../utils/axios';
import { Status, Language } from '../constants';

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
    case Language.PYTHON:
      return await executePython(codeObject);
    case Language.JAVA:
      return await executeJava(codeObject);
    case Language.JS:
      return await executeJs(codeObject);
    default:
      return await executePython(codeObject);
  }
};

const executePython = async (codeObject) => {
  try {
    const response = await axiosExecution.post(
      '/python',
      codeObject,
      getConfig()
    );
    return response.data.output;
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), {
        response: { status: Status.REQUEST_TIMEOUT },
        message: 'Network Error',
      });
    }
    throw err;
  }
};

const executeJava = async (codeObject) => {
  try {
    const response = await axiosExecution.post(
      '/java',
      codeObject,
      getConfig()
    );
    return response.data.output;
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), {
        response: { status: Status.REQUEST_TIMEOUT },
        message: 'Network Error',
      });
    }
    throw err;
  }
};

const executeJs = async (codeObject) => {
  try {
    const response = await axiosExecution.post('/js', codeObject, getConfig());
    return response.data.output;
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), {
        response: { status: Status.REQUEST_TIMEOUT },
        message: 'Network Error',
      });
    }
    throw err;
  }
};
