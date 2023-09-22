import axios from 'axios';

const authRootUrl = 'http://localhost:5000/auth';
const userRootUrl = 'http://localhost:5000/user';

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};

export const signup = async (userData) => {
  try {
    return await axios.post(authRootUrl + '/signup', userData, config);
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), { response: { status: 408 }, message: 'Network Error' });
    }
    throw err;
  }
};

export const login = async (userData) => {
  try {
    return await axios.post(authRootUrl + '/login', userData, config);
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), { response: { status: 408 }, message: 'Network Error' });
    }
    throw err;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get(userRootUrl + '/readAll', config);
    return res.data.info;
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), { response: { status: 408 }, message: 'Network Error' });
    }
    throw err;
  }
};

export const getUser = async (id) => {
  try {
    const res = await axios.post(userRootUrl + '/read', { id }, config);
    return res.data.info;
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), { response: { status: 408 }, message: 'Network Error' });
    }
    throw err;
  }
};

export const updateUsername = async (id, newUsername) => {
  try {
    return await axios.post(userRootUrl + '/update', { id: id, username: newUsername }, config);
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), { response: { status: 408 }, message: 'Network Error' });
    }
    throw err;
  }
};

export const updatePassword = async (id, currentPassword, newPassword, confirmPassword) => {
  try {
    return await axios.post(userRootUrl + '/change-password',
      { id: id, currentPassword: currentPassword, newPassword: newPassword, confirmPassword: confirmPassword },
      config
    );
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), { response: { status: 408 }, message: 'Network Error' });
    }
    throw err;
  }
};

export const deleteUser = async (id) => {
  try {
    return await axios.post(userRootUrl + '/delete', { id }, config);
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), { response: { status: 408 }, message: 'Network Error' });
    }
    throw err;
  }
};
