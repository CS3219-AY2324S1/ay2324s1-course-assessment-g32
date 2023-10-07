// import React from 'react';
// import { useNavigate, Outlet } from 'react-router-dom';
// import { getIsMaintainer } from './helpers.js';

// const MaintainerRoute = () => {
//   const navigate = useNavigate();

//   const checkAuth = async () => {
//     const isAuthenticatedResult = await getIsMaintainer();
//     if (!isAuthenticatedResult) {
//       // If not authorized or not a maintainer, direct to unauthorized page
//       navigate('/unauthorized');
//     }
//   };

//   checkAuth();

//   return <Outlet />;
// };

// export default MaintainerRoute;

import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { getIsMaintainer } from '../utils/helpers.js';

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const isMaintainer = await getIsMaintainer();
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

export default ProtectedRoute;
