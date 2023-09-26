import React from 'react';
import Header from '../../components/Header';
import './Landing.css';
import UserList from '../../components/User/UserList/UserList';

function Landing() {
  return (
    <div className='landing'>
      <Header />
      <div className='body'>
        <UserList />
      </div>
    </div>
  );
}

export default Landing;
