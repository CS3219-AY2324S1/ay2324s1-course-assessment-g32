import Cookies from 'js-cookie';
import { authorize, authorizeMaintainer } from '../api/AuthApi.js';

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
    const response = await authorize(token);
    return response;
  } catch (error) {
    return error;
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

export const getIsMaintainerForMaintainerPage = async () => {
  try {
    const token = getCookie();
    const response = await authorizeMaintainer(token);
    return response?.data?.userInfo?.isMaintainer ? true : false;
  } catch (error) {
    return false;
  }
};

export const getIsMaintainer = async () => {
  const response = await getUserInfo();
  return response?.data?.userInfo?.isMaintainer ? true : false;
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
