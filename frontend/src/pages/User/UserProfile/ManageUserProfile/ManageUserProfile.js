import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../../components/Header';
import {
  ViewUserTopPane,
  ViewUserBottomPane,
} from '../../../../components/User/ViewUser';
import { getUser } from '../../../../api/UserApi.js';
import { errorHandler } from '../../../../utils/errors.js';
import { Grid, Container } from '@mui/material';
import { getCookie, getUserId } from '../../../../utils/helpers';

function ManageUserProfile() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await getUserId();
        const response = await getUser(userId, getCookie());
        setUser(response);
      } catch (error) {
        errorHandler(error);
      }
    };

    fetchData();

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
