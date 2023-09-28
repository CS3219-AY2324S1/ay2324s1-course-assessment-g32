import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import decode from 'jwt-decode';

const MaintainerRoute = () => {
  const isMaintainer = () => {
    try {
      const token = Cookies.get('jwt');
      // console.log("token: " + token)

      if (!token) {
        // console.log("no token found")
        return false;
      } else {
        const decodedToken = decode(token, 'password');
        if (decodedToken) {
          return decodedToken.isMaintainer !== 1 ? false : true;
        } else {
          // console.log("unable to decode token")
          return false;
        }
      }
    } catch (err) {
      console.error('Cookie not found');
      return false;
    }
  };

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return isMaintainer() ? <Outlet /> : <Navigate to='/unauthorised' />;
};

export default MaintainerRoute;
