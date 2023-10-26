import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { getLoginStatus } from '../utils/helpers.js';

const NonLoggedInRoute = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogInStatus = async () => {
      const isLoggedInStatus = await getLoginStatus();
      setIsLoggedIn(isLoggedInStatus);
      if (isLoggedInStatus) {
        navigate('/landing', { replace: true });
      }
    };
    checkLogInStatus();
  }, [navigate]);

  if (isLoggedIn) {
    return null;
  } else {
    return <Outlet />;
  }
};

export default NonLoggedInRoute;
