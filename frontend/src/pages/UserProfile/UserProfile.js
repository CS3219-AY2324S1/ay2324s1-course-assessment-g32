import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Grid, Container } from '@mui/material';
import Header from '../../components/Header';
import ChangeUserPassword from '../../components/User/ChangeUserPassword';
import EditUser from '../../components/User/EditUser';
import { ViewUserTopPane, ViewUserBottomPane } from '../../components/User/ViewUser';
import { getUser } from '../../api/UserApi.js';
import { showValidationErrorToast, showServerErrorToast } from '../../utils/toast.js';

function UserProfile() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: Implement better session management for assignment 3
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const fetchData = async () => {
      getUser(storedUser.id)
        .then((res) => {
          setUser(res);
        })
        .catch((error) => {
          navigate(-1);
          if (error.response.status === 400) {
            showValidationErrorToast(error);
          } else {
            showServerErrorToast(error);
          }
        });
    };

    if (storedUser) {
      fetchData();
    } else {
      // No user session
      navigate('/login');
    }
  }, [navigate, setUser]);

  return (
    <div>
      <Header />
      <Container sx={{ marginTop: '20px' }}>
        <Grid>
          <ViewUserTopPane user={user} />
          <Routes>
            <Route path='/' element={<ViewUserBottomPane user={user} />} />
            <Route path='/edit' element={<EditUser user={user} />} />
            <Route path='/change-password' element={<ChangeUserPassword user={user} />} />
          </Routes>
          <ToastContainer />
        </Grid>
      </Container>
    </div>
  );
}

export default UserProfile;
