import axios from 'axios';

export const signup = async (userData) => {
  return axios.post('http://localhost:3000/auth/signup', userData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const login = async (userData) => {
  return axios.post('http://localhost:3000/auth/login', userData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getAllUsers = async () => {
  const res = await axios.get('http://localhost:3000/user/readAll', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data.info;
};

export const getUser = async (id) => {
  const res = await axios.post(
    'http://localhost:3000/user/read',
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
    'http://localhost:3000/user/update',
    { id: id, username: newUsername },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return res;
};

export const updatePassword = async (id, oldPassword, newPassword, confirmNewPassword) => {
  // TODO: Check newPassword == confirmNewPassword
  // TODO: Check oldPassword is correct
  console.log(id);
  console.log(newPassword);
  const res = await axios.post(
    'http://localhost:3000/user/update',
    { id: id, password: newPassword },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return res;
};

export const deleteUser = (id) => {
  return axios.post(
    'http://localhost:3000/user/delete',
    { id },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};
