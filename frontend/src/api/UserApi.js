import axios from 'axios';

export const getAllUsers = async () => {
  const res = await axios.post('http://localhost:3000/user/readAll', {
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
