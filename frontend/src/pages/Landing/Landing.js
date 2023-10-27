import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import SubmissionHeatMap from '../../components/Statistics/SubmissionHeatMap';
import SubmissionPieChart from '../../components/Statistics/SubmissionPieChart';
import MatchingModal from '../../components/MatchMaking/MatchingModal';
import Header from '../../components/Header';
import './Landing.css';

function Landing() {

  const [isMatchingModalOpen, setMatchingModalOpen] = useState(false);

  const handleToggleModal = () => {
    setMatchingModalOpen(!isMatchingModalOpen);
  };

  return (
    <div className='landing'>
      <Header />
      <h1 className='title m-5'>Welcome, User</h1>
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
          isOpen={isMatchingModalOpen}
          onClose={handleToggleModal}
        />
      )}
    </div>
  );
}

export default Landing;
