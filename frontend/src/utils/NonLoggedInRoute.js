import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { getUserInfo } from '../utils/helpers.js';

const NonLoggedInRoute = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const userInfo = await getUserInfo();
      setIsAuthorized(userInfo);
      if (userInfo) {
        navigate('/landing');
      }
    };
    checkAuth();
  }, [navigate]);

  if (isAuthorized) {
    return null;
  } else {
    return <Outlet />;
  }
};

export default NonLoggedInRoute;
