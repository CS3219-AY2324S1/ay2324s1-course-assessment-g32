import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../../components/Header';
import AddUser from '../../components/User/AddUser';
import EditUser from '../../components/User/EditUser';
import UserList from '../../components/User/UserList/UserList';
import './ManageUserProfiles.css';

function ManageUserProfiles() {
  return (
    <div className='users-management'>
      <Header />
      <div className='body'>
        <Routes>
          <Route path='/' element={<UserList />} />
          <Route path='/new/' element={<AddUser />} />
          <Route path='/edit/' element={<EditUser />} />
        </Routes>
      </div>
    </div>
  );
}

export default ManageUserProfiles;
