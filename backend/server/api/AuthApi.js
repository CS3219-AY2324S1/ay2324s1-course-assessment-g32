axios = require('axios');
const env = require('../../loadEnvironment.js');

const authRootUrl = env.AUTH_URL + '/auth';

const authorize = async (token) => {
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

// const authenticate = async (userData) => {
//   try {
//     return await axios.post(authRootUrl + '/authenticate',
//       userData,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );
//   } catch (err) {
//     if (err.code === 'ERR_NETWORK') {
//       throw Object.assign(new Error(err.code), { response: { status: 408 }, message: 'Network Error' });
//     }
//     throw err;
//   }
// };

module.exports = {
  // authenticate,
  authorize,
};
