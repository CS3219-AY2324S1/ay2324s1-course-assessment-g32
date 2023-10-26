const axios = require('axios');
const env = require('../loadEnvironment');
const { Status } = require('../constants');

const axiosAuth = axios.create({
  baseURL: env.AUTH_URL + '/auth',
});

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

module.exports = {
  authorize,
};
