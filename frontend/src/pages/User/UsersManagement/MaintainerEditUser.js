import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../../components/Header.js';
import Spinner from '../../../components/Spinner.js';
import EditUser from '../../../components/User/EditUser.js';

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
      <EditUser user={user} isMaintainerPage={true} />
    </div>
  );
};

export default MaintainerEditUser;
