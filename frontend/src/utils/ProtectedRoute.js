import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import decode from 'jwt-decode';

// TODO: Check authorisation rights with auth api instead of decoding token here
const ProtectedRoute = () => {
  const isAuthenticated = () => {
    try {
      const token = Cookies.get('jwt');

      // If there is no token or unable to decode the token as it is invalid
      if (!token || !decode(token, 'password')) {
        return false;
      } else {
        return true;
      }
    } catch (err) {
      console.error('Cookie not found');
      return false;
    }
  };

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return isAuthenticated() ? <Outlet /> : <Navigate to='/unauthorised' />;
};

export default ProtectedRoute;
