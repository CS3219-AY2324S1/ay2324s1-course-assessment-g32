import Cookies from 'js-cookie';

export const getCookie = () => {
  try {
    return Cookies.get('jwt');
  } catch (err) {
    console.error('Cookie not found');
    return null;
  }
};
