const axios = require('axios');
const env = require('../loadEnvironment');
const { Status } = require('../constants');

const axiosAuth = axios.create({
  baseURL: env.AUTH_URL + '/auth',
});

const getToken = async (userInfo) => {
  try {
    return await axiosAuth.post('/generate', userInfo, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
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

const authorize = async (token) => {
  try {
    return await axiosAuth.get('/authorize', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    });
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

const authorizeMaintainer = async (token) => {
  try {
    return await axiosAuth.get('/authorize-maintainer', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    });
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

module.exports = {
  getToken,
  authorize,
  authorizeMaintainer,
};
