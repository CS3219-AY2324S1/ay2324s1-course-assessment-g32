import React from 'react';
import logo from '../images/logo.png';
import '../css/UnauthorizedPage.css';

const UnauthorizedPage = () => {
  return (
    <div className='page'>
      <img src={logo} alt='Unauthorized access' width='30%' />
      <h3>Error</h3>
      <h4>You have no rights to access this page.</h4>
    </div>
  );
};

export default UnauthorizedPage;
