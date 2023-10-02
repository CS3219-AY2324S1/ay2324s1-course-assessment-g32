import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { hasMaintainerRole } from '../api/AuthorisationApi.js';
import { errorHandler } from './errors.js';

export const isMaintainer = async () => {
  try {
    const token = Cookies.get('jwt');

    return await hasMaintainerRole(token);

  } catch (err) {
    errorHandler(err);
    return false;
  }
};

const MaintainerRoute = () => {
  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return isMaintainer() ? <Outlet /> : <Navigate to='/unauthorised' />;
};

export default MaintainerRoute;
