import React, { useState, useEffect } from 'react';
import { SubmissionHeatMap, SubmissionPieChart } from '../components/Statistics';
import MatchingModal from '../components/MatchMaking/MatchingModal';
import { getUserId, getCookie } from '../utils/helpers';
import { getUser } from '../api/UserApi';
import { errorHandler } from '../utils/errors';
import Header from '../components/Header';
import '../css/Landing.css';

function Landing() {
  const [user, setUser] = useState('');
  const [isMatchingModalOpen, setMatchingModalOpen] = useState(false);

  const handleToggleModal = () => {
    setMatchingModalOpen(!isMatchingModalOpen);
  };

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
  }, [setUser]);

  return (
    <div className='landing'>
      <Header />
      <h1 className='title m-5'>Welcome, {user.displayName}</h1>
      <SubmissionPieChart />
      <SubmissionHeatMap />
      <div className='d-flex align-items-center justify-content-center'>
        <button
          type='button'
          className='btn btn-success w-25 mt-5'
          onClick={handleToggleModal}
        >
          Quick Match
        </button>
      </div>
      {isMatchingModalOpen && (
        <MatchingModal
          user={user}
          isOpen={isMatchingModalOpen}
          onClose={handleToggleModal}
        />
      )}
    </div>
  );
};

export default Landing;
