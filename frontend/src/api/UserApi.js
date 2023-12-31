import { axiosUser } from '../utils/axios';
import { Status } from '../constants';

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
    return await axiosUser.post('/signup', userData, getConfig());
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), {
        response: { status: Status.REQUEST_TIMEOUT },
        message: 'Network Error',
      });
    }
    throw err;
  }
};

export const login = async (userData) => {
  try {
    return await axiosUser.post('/login', userData, getConfig());
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), {
        response: { status: Status.REQUEST_TIMEOUT },
        message: 'Network Error',
      });
    }
    throw err;
  }
};

export const getAllUsers = async (jwtToken) => {
  try {
    const res = await axiosUser.get('/all', getTokenConfig(jwtToken));
    return res.data.info;
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), {
        response: { status: Status.REQUEST_TIMEOUT },
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
    const res = await axiosUser.get('/', config);
    return res.data.info;
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), {
        response: { status: Status.REQUEST_TIMEOUT },
        message: 'Network Error',
      });
    }
    throw err;
  }
};

export const updateDisplayName = async (id, newDisplayName, jwtToken) => {
  try {
    const res = await axiosUser.put(
      '/display-name',
      { id: id, displayName: newDisplayName },
      getTokenConfig(jwtToken)
    );
    return res;
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), {
        response: { status: Status.REQUEST_TIMEOUT },
        message: 'Network Error',
      });
    }
    throw err;
  }
};

export const updateCodingLanguage = async (id, newLanguage, jwtToken) => {
  try {
    const res = await axiosUser.put(
      '/programming-language',
      { id: id, programmingLanguage: newLanguage },
      getTokenConfig(jwtToken)
    );
    return res;
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), {
        response: { status: Status.REQUEST_TIMEOUT },
        message: 'Network Error',
      });
    }
    throw err;
  }
};

export const updateQuesionComplexity = async (id, newComplexity, jwtToken) => {
  try {
    const res = await axiosUser.put(
      '/complexity',
      { id: id, complexity: newComplexity },
      getTokenConfig(jwtToken)
    );
    return res;
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), {
        response: { status: Status.REQUEST_TIMEOUT },
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
    return await axiosUser.put(
      '/change-password',
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
        response: { status: Status.REQUEST_TIMEOUT },
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
    return await axiosUser.delete('/', config);
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), {
        response: { status: Status.REQUEST_TIMEOUT },
        message: 'Network Error',
      });
    }
    throw err;
  }
};

export const toggleUserRole = async (id, jwtToken) => {
  try {
    return await axiosUser.put(
      '/toggle-user-role',
      { id },
      getTokenConfig(jwtToken)
    );
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), {
        response: { status: Status.REQUEST_TIMEOUT },
        message: 'Network Error',
      });
    }
    throw err;
  }
};
