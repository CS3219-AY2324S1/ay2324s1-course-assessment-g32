import React from 'react';
import Header from '../../../components/Header';
import { UserList } from '../../../components/User';

function ManageUserProfiles() {
  return (
    <div className='users-management'>
      <Header />
      <UserList />
    </div>
  );
}

export default ManageUserProfiles;
