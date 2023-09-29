import axios from 'axios';

const env = require('../loadEnvironment.js');
const authRootUrl = env.AUTH_URL + '/auth';

const login = async (userData) => {
  try {
    return await axios.post(authRootUrl + '/login', userData, {
      headers: {
        'Content-Type': 'application/json',
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

const signup = async (userData) => {
  try {
    return await axios.post(authRootUrl + '/signup', userData, {
      headers: {
        'Content-Type': 'application/json',
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

export const handleAuth = async (userData, auth_type) => {
  try {
    if (auth_type === 'login') {
      return await login(userData);
    } else if (auth_type === 'signup') {
      return await signup(userData);
    } else {
      // update this error code next time
      throw Object.assign(new Error('error to be updated'), {
        status: 500,
      });
    }
  } catch (error) {
    throw error;
  }
};

export const authorize = async (token) => {
  try {
    return await axios.get(authRootUrl + '/authorize', {
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

// export const authenticate = async (userData) => {
//   try {
//     return await axios.post(authRootUrl + '/authenticate', userData, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   } catch (err) {
//     if (err.code === 'ERR_NETWORK') {
//       throw Object.assign(new Error(err.code), {
//         response: { status: 408 },
//         message: 'Network Error',
//       });
//     }
//     throw err;
//   }
// };
