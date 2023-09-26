import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header.js';
import { Container, Grid } from '@mui/material';
import { ViewUserTopPane } from '../../../components/User/ViewUser.js';
import EditUser from '../../../components/User/EditUser.js';
import { useLocation } from 'react-router-dom';

const NormalEditUser = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    setUser(location.state.user);
    setIsLoading(false);
  }, [location.state]);

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
          <EditUser user={user} isMaintainerPage={false} />
        </Grid>
      </Container>
    </div>
  );
};

export default NormalEditUser;
