import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AddUser from 'components/User/AddUser';
import EditUser from 'components/User/EditUser';
import UserList from 'components/User/UserList/UserList';
import 'css/ManageUserProfiles.css';

function ManageUserProfiles() {

  return <div className='users-management'>
      <div className='body'>
        <Routes>
          <Route path='/' element={<UserList />} />
          <Route path='/new' element={<AddUser />} />
          <Route path='/edit' element={<EditUser />} />
        </Routes>
      </div>
    </div>
  ;
}

export default ManageUserProfiles;
