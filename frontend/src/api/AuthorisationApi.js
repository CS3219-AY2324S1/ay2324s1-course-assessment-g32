import axios from 'axios';
const env = require("../loadEnvironment");

const authorisationRootUrl = env.SERVER_URL + '/authorisation';

export const hasMaintainerRole = async (jwtToken) => {
  try {
    const response = await axios.get(authorisationRootUrl + "/isMaintainer", {
      params: {
        jwtToken: jwtToken
      }
    });

    return response.data.isMaintainer;
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), { response: { status: 408 }, message: 'Network Error' });
    }
    throw err;
  }
};
