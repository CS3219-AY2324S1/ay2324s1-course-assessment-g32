import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from '../../components/Header';
import EditUser from '../../components/User/EditUser';
import ChangeUserPassword from '../../components/User/ChangeUserPassword';
import { ViewUserTopPane, ViewUserBottomPane } from '../../components/User/ViewUser';
import { getUser } from '../../api/UserApi.js';
import { showValidationErrorToast, showServerErrorToast } from '../../utils/toast.js';
import { Grid, Container } from '@mui/material';

function UserProfile() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
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
        <Grid spacing={2}>
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
