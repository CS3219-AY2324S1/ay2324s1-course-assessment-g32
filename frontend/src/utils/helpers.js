import Cookies from 'js-cookie';
import { authorize } from '../api/AuthApi';

export const getCookie = () => {
  try {
    return Cookies.get('jwt');
  } catch (err) {
    return null;
  }
};

export const removeCookie = () => {
  Cookies.remove('jwt');
};

export const getUserInfo = async () => {
  try {
    const token = getCookie();
    if (token) {
      const response = await authorize(token);
      return response;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const getLoginStatus = async () => {
  const response = await getUserInfo();
  // Return true if data is not null/undefined
  return !!response?.data?.userInfo;
};

export const getUserId = async () => {
  const response = await getUserInfo();
  return response?.data?.userInfo?.userId;
};

export const getIsMaintainer = async () => {
  const response = await getUserInfo();
  if (!response?.data?.userInfo || !response?.data?.userInfo?.isMaintainer) {
    return false;
  } else {
    return true;
  }
};

export const parseDatetime = (datetime) => {
  const date = new Date(datetime);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
  };

  return date.toLocaleString(undefined, options);
};
