import React from 'react';
import logo from '../../images/logo.png';
import './UnauthorisedPage.css';

const UnauthorisedPage = () => {
  return (
    <div className='page'>
      <img src={logo} alt='Unauthorised access' width='30%' />
      <h4>Error 401</h4>
      <h3>You have no authorisation to access this page.</h3>
    </div>
  );
};

export default UnauthorisedPage;
