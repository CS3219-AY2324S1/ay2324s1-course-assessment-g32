import React, { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import UserList from '../../components/User/UserList/UserList';
// import QuestionDescription from '../../components/QuestionDescription/QuestionDescription';
// import EditQuestion from '../../components/EditQuestion/EditQuestion';
import Header from '../../components/Header';
import './UserManagement.css';
import EditUser from '../../components/User/EditUser';
// import { Context } from '../../Context';
// import { useNavigate, Redirect } from 'react-router-dom';

function UserManagement() {
  return (
    <div className='user-management'>
      <Header />
      <div className='body'>
        <Routes>
          <Route path='/' element={<UserList />} />
          <Route path='/edit/:id' element={<EditUser />} />
          {/* <Route path='/edit/:id' element={<EditQuestion />} /> */}
        </Routes>
        <ToastContainer />
      </div>
    </div>
  );
}

export default UserManagement;
