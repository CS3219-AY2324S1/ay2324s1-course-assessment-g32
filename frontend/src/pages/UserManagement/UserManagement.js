import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import UserList from '../../components/User/UserList/UserList';
import Header from '../../components/Header';
import './UserManagement.css';
import EditUser from '../../components/User/EditUser';

function UserManagement() {
  return (
    <div className='user-management'>
      <Header />
      <div className='body'>
        <Routes>
          <Route path='/' element={<UserList />} />
          <Route path='/edit/:id' element={<EditUser />} />
        </Routes>
        <ToastContainer />
      </div>
    </div>
  );
}

export default UserManagement;
