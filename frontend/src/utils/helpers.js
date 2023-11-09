import Cookies from 'js-cookie';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { javascript } from '@codemirror/lang-javascript';
import { authorize, authorizeMaintainer } from '../api/AuthApi';
import { Language, Boilerplate } from '../constants';

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

export const isWithinWindow = (position, editorBoxRef) => {
  if (editorBoxRef.current) {
    const { x, y } = position;
    const { top, left, width, height } =
      editorBoxRef.current.getBoundingClientRect();
    if (x > left && x < left + width - 10 && y > top && y < top + height - 10) {
      return true;
    }
  }
  return false;
};

export const getBoilerplate = (language) => {
  switch (language) {
    case Language.PYTHON:
      return Boilerplate.PYTHON;
    case Language.JAVA:
      return Boilerplate.JAVA;
    case Language.JS:
      return Boilerplate.JS;
    default:
      return Boilerplate.PYTHON;
  }
};

export const getLanguageExtension = (language) => {
  switch (language) {
    case Language.PYTHON:
      return python();
    case Language.JAVA:
      return java();
    case Language.JS:
      return javascript();
    default:
      return python();
  }
};
