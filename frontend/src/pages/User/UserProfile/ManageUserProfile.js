import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Container } from '@mui/material';
import Header from '../../../components/Header';
import Spinner from '../../../components/Spinner';
import { ViewUserTopPane, ViewUserBottomPane } from '../../../components/User';
import { getUser } from '../../../api/UserApi';
import { errorHandler } from '../../../utils/errors';
import { getCookie, getUserId } from '../../../utils/helpers';

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
    <div>
      <Header />
      <div className='background'>
        <div className='main'>
          <div className='container'>
            <Spinner />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <Header />
      <div className='background'>
        <div className='main'>
          <Container sx={{ margin: '20px auto' }}>
            <Grid>
              <ViewUserTopPane user={user} />
              <ViewUserBottomPane user={user} />
            </Grid>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default ManageUserProfile;
