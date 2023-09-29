import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import decode from 'jwt-decode';

/* TODO: Check authorisation rights with auth api instead of decoding token here */
export const isMaintainer = () => {
  try {
    const token = Cookies.get('jwt');

    if (!token) {
      return false;
    } else {
      const decodedToken = decode(token, 'password');
      if (decodedToken) {
        return decodedToken.isMaintainer !== 1 ? false : true;
      } else {
        return false;
      }
    }
  } catch (err) {
    console.error('Cookie not found');
    return false;
  }
};

const MaintainerRoute = () => {
  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return isMaintainer() ? <Outlet /> : <Navigate to='/unauthorised' />;
};

export default MaintainerRoute;
