import axios from 'axios';
const env = require("../loadEnvironment");

const rootUrl = 'http://localhost:' + env.SERVER_PORT;

export const signup = async (userData) => {
  return axios.post(rootUrl + '/auth/signup', userData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const login = async (userData) => {
  return axios.post(rootUrl + '/auth/login', userData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getAllUsers = async () => {
  const res = await axios.get(rootUrl + '/user/readAll', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data.info;
};

export const getUser = async (id) => {
  const res = await axios.post(
    rootUrl + '/user/read',
    { id },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return res.data.info;
};

export const updateUsername = async (id, newUsername) => {
  const res = await axios.post(
    rootUrl + '/user/update',
    { id: id, username: newUsername },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return res;
};

export const updatePassword = (id, currentPassword, newPassword, confirmPassword) => {
  return axios.post(
    rootUrl + '/user/change-password',
    { id: id, currentPassword: currentPassword, newPassword: newPassword, confirmPassword: confirmPassword },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

export const deleteUser = (id) => {
  return axios.post(
    rootUrl + '/user/delete',
    { id },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};
