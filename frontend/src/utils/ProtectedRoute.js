import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { getUserId } from '../utils/helpers';

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const userId = await getUserId();
      setIsAuthorized(userId);
      if (!userId) {
        navigate('/unauthorized');
      }
    };
    checkAuth();
  }, [navigate]);

  if (isAuthorized) {
    return <Outlet />;
  } else {
    return null;
  }
};

export default ProtectedRoute;
