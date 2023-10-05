import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from 'components/Header';
import AddUser from 'components/User/AddUser';
import EditUser from 'components/User/EditUser';
import UserList from 'components/User/UserList/UserList';
import 'css/ManageUserProfiles.css';

function ManageUserProfiles() {
  const [isLoading, setIsLoading] = useState(true);

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!storedUser) {
      navigate('/login');
    }

    setIsLoading(false);
  }, [navigate, storedUser]);

  return isLoading ? (
    <div className='spinner-border text-primary' role='status'>
      <span className='visually-hidden'>Loading...</span>
    </div>
  ) : (
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
