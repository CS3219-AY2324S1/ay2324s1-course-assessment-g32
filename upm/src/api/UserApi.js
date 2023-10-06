import axios from 'axios';
const env = require("../loadEnvironment");

const userRootUrl = env.SERVER_URL + '/user';

export const signup = async (userData) => {
  try {
    return await axios.post(userRootUrl + '/create', 
      userData, 
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), { response: { status: 408 }, message: 'Network Error' });
    }
    throw err;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get(userRootUrl + '/readAll', 
    { headers: { 'Content-Type': 'application/json' } }
    );
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
    const res = await axios.post(userRootUrl + '/read',
      { id },
      { headers: { 'Content-Type': 'application/json' } }
    );
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
    console.log(userRootUrl + '/update', id, newUsername);
    const res = await axios.post(userRootUrl + '/update',
      { id: id, username: newUsername },
      { headers: { 'Content-Type': 'application/json' } }
    ).catch(e => {console.log(e)});
  return res;
  } catch (err) {
    console.log(err)
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
      { headers: { 'Content-Type': 'application/json' } }
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
    return await axios.post(userRootUrl + '/delete',
      { id },
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), { response: { status: 408 }, message: 'Network Error' });
    }
    throw err;
  }
};
