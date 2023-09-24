import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import SelectComplexity from '../../components/MatchMaking/SelectComplexity';
import Queue from '../../components/MatchMaking/Queue';

function MatchMaking() {
  const [isLoading, setIsLoading] = useState(true);

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!storedUser) {
      navigate('/login');
    }
    setIsLoading(false);
  }, [navigate, storedUser]);

  return isLoading ? (
    <div className='spinner-border text-primary' role='status'>
      <span className='visually-hidden'>Loading...</span>
    </div>
  ) : (
    <div>
      <Header />
      <div className='body'>
        <Routes>
          <Route path='/' element={<SelectComplexity />} />
          <Route path='/:difficulty' element={<Queue user={storedUser} />} />
        </Routes>
      </div>
    </div>
  );
}

export default MatchMaking;
