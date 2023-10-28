import { axiosAuth } from '../utils/axios';
import { Status } from '../constants';

// To get userId/isMaintainer
export const authorize = async (token) => {
  try {
    return await axiosAuth.get('/authorize', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    });
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
