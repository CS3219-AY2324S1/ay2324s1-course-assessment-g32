import axios from 'axios';

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};

export const signup = async (userData) => {
  try {
    return await axios.post('http://localhost:3000/auth/signup', userData, config);
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), { response: { status: 408 }, message: 'Network Error' });
    }
    throw err;
  }
};

export const login = async (userData) => {
  try {
    return await axios.post('http://localhost:3000/auth/login', userData, config);
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), { response: { status: 408 }, message: 'Network Error' });
    }
    throw err;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get('http://localhost:3000/user/readAll', config);
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
    const res = await axios.post('http://localhost:3000/user/read', { id }, config);
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
    const userData = {
      id: id,
      username: newUsername
    };
    return await axios.post('http://localhost:3000/user/update', userData, config);
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), { response: { status: 408 }, message: 'Network Error' });
    }
    throw err;
  }
};

export const updatePassword = async (id, currentPassword, newPassword, confirmPassword) => {
  try {
    const passwordData = {
      id: id, 
      currentPassword: currentPassword, 
      newPassword: newPassword, 
      confirmPassword: confirmPassword 
    };
    return await axios.post('http://localhost:3000/user/change-password', passwordData, config);
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), { response: { status: 408 }, message: 'Network Error' });
    }
    throw err;
  }
};

export const deleteUser = async (id) => {
  try {
     return await axios.post('http://localhost:3000/user/delete', { id }, config);
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), { response: { status: 408 }, message: 'Network Error' });
    }
    throw err;
  }
};
