import React from 'react';
import Header from '../../../components/Header';
import { UserList } from '../../../components/User';
import '../../../css/ManageUserProfiles.css';

function ManageUserProfiles() {
  return (
    <div className='background'>
      <div className='main'>
        <div className='users-management'>
          <Header />
          <UserList />
        </div>
      </div>
    </div>
  );
}

export default ManageUserProfiles;
