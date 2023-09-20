import axios from 'axios';

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};

export const signup = async (userData) => {
  return axios.post('http://localhost:3000/auth/signup', userData, config);
};

export const login = async (userData) => {
  return axios.post('http://localhost:3000/auth/login', userData, config);
};

export const getAllUsers = async () => {
  const res = await axios.get('http://localhost:3000/user/readAll', config);
  return res.data.info;
};

export const getUser = async (id) => {
  const res = await axios.post('http://localhost:3000/user/read', { id }, config);
  return res.data.info;
};

export const updateUsername = async (id, newUsername) => {
  const res = await axios.post('http://localhost:3000/user/update', { id: id, username: newUsername }, config);
  return res;
};

export const updatePassword = (id, currentPassword, newPassword, confirmPassword) => {
  return axios.post(
    'http://localhost:3000/user/change-password',
    { id: id, 
      currentPassword: currentPassword, 
      newPassword: newPassword, 
      confirmPassword: confirmPassword 
    },
    config
  );
};

export const deleteUser = (id) => {
  return axios.post('http://localhost:3000/user/delete', { id }, config);
};
