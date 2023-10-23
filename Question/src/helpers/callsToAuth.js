const axios = require('axios');
const env = require('../loadEnvironment.js');

const authRootUrl = env.AUTH_URL + '/auth';
const axiosInstance = axios.create({
  baseURL: authRootUrl,
});

const authorize = async (token) => {
  try {
    return await axiosInstance.get('/authorize', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    });
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

const authorizeMaintainer = async (token) => {
  try {
    return await axiosInstance.get('/authorizeMaintainer', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    });
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

module.exports = {
  authorize,
  authorizeMaintainer,
};
