import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import decode from 'jwt-decode';
import Header from '../../../components/Header';
import {
  ViewUserTopPane,
  ViewUserBottomPane,
} from '../../../components/User/ViewUser';
import { getUser } from '../../../api/UserApi.js';
import { errorHandler } from '../../../utils/errors.js';
import { Grid, Container } from '@mui/material';

function ManageUserProfile() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = decode(Cookies.get('jwt'), 'password');
    const fetchData = async () => {
      try {
        const response = await getUser(token.userId);
        console.log(response);
        setUser(response);
      } catch (error) {
        errorHandler(error);
      }
    };

    if (token) {
      fetchData();
    } else {
      // No user session
      navigate('/login');
    }

    setIsLoading(false);
  }, [navigate, setUser]);

  return isLoading ? (
    <div className='spinner-border text-primary' role='status'>
      <span className='visually-hidden'>Loading...</span>
    </div>
  ) : (
    <div>
      <Header />
      <Container sx={{ marginTop: '20px' }}>
        <Grid>
          <ViewUserTopPane user={user} />
          <ViewUserBottomPane user={user} />
        </Grid>
      </Container>
    </div>
  );
}

export default ManageUserProfile;
