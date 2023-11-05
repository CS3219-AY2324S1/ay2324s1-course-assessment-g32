import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../../components/Header';
import Spinner from '../../../components/Spinner';
import { EditUser, ViewUserTopPane } from '../../../components/User';
import { Container, Grid } from '@mui/material';

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
