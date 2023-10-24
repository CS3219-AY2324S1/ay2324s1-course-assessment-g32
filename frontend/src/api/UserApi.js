import axios from 'axios';
const env = require('../loadEnvironment');

const userRootUrl = env.SERVER_URL + '/user';

const getConfig = () => {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
  };
};

const getTokenConfig = (jwtToken) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + jwtToken,
    },
  };
};

export const signup = async (userData) => {
  try {
    return await axios.post(userRootUrl + '/signup', userData, getConfig());
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

export const login = async (userData) => {
  try {
    return await axios.post(userRootUrl + '/login', userData, getConfig());
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

export const getAllUsers = async (jwtToken) => {
  try {
    const res = await axios.get(
      userRootUrl + '/read-all',
      getTokenConfig(jwtToken)
    );
    return res.data.info;
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

export const getUser = async (id, jwtToken) => {
  try {
    let config = getTokenConfig(jwtToken);
    config.params = { id: id };
    const res = await axios.get(userRootUrl + '/read', config);
    return res.data.info;
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

export const updateDisplayName = async (id, newDisplayName, jwtToken) => {
  try {
    const res = await axios.put(
      userRootUrl + '/update',
      { id: id, displayName: newDisplayName },
      getTokenConfig(jwtToken)
    );
    return res;
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

export const updatePassword = async (
  id,
  currentPassword,
  newPassword,
  confirmPassword,
  jwtToken
) => {
  try {
    return await axios.put(
      userRootUrl + '/change-password',
      {
        id: id,
        currentPassword: currentPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      },
      getTokenConfig(jwtToken)
    );
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

export const deleteUser = async (id, jwtToken) => {
  try {
    let config = getTokenConfig(jwtToken);
    config.params = { id: id };
    return await axios.delete(userRootUrl + '/delete', config);
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

export const toggleUserRole = async (id, jwtToken) => {
  try {
    return await axios.put(
      userRootUrl + '/toggle-user-role',
      { id },
      getTokenConfig(jwtToken)
    );
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
