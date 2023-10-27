import React from 'react';
import logo from '../../images/logo.png';
import './PageNotFound.css';

const PageNotFound = () => {
  return (
    <div className='page'>
      <img src={logo} alt='Page Not Found' width='30%' />
      <h3>Error 404</h3>
      <h4>Page Not Found</h4>
    </div>
  );
};

export default PageNotFound;
