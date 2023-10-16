import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header.js';
import Spinner from '../../../components/Spinner.js';
import { Container, Grid } from '@mui/material';
import { ViewUserTopPane } from '../../../components/User/ViewUser.js';
import EditUser from '../../../components/User/EditUser.js';
import { useLocation, useNavigate } from 'react-router-dom';

const NormalEditUser = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setUser(location.state.user);
      setIsLoading(false);
    } else {
      navigate(-1);
    }
  }, [location.state, navigate]);

  return isLoading ? (
    <Spinner />
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
