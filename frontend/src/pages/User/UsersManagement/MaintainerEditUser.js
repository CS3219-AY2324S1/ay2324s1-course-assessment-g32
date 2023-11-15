import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../../components/Header';
import Spinner from '../../../components/Spinner';
import { EditUser } from '../../../components/User';

const MaintainerEditUser = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    setUser(location.state.user);
    setIsLoading(false);
  }, [location.state]);

  return isLoading ? (
    <Spinner />
  ) : (
    <div>
      <Header />
      <div className='background'>
        <div className='main'>
          <EditUser user={user} isMaintainerPage={true} />
        </div>
      </div>
    </div>
  );
};

export default MaintainerEditUser;
