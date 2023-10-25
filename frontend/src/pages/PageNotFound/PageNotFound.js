import React from 'react';
import logo from '../../images/logo.png';
import './PageNotFound.css';

const PageNotFound = () => {
  return (
    <div className='page'>
      <img src={logo} alt='Page Not Found' width='30%'/>
      <h4>Error 404</h4>
      <h3>Page Not Found</h3>
    </div>
  );
};

export default PageNotFound;
