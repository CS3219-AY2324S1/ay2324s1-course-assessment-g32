import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { getIsMaintainerForMaintainerPage } from '../utils/helpers.js';

const MaintainerRoute = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const isMaintainer = await getIsMaintainerForMaintainerPage();
      setIsAuthorized(isMaintainer);
      if (!isMaintainer) {
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

export default MaintainerRoute;
