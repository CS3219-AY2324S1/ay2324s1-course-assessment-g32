import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SubmissionHeatMap,
  SubmissionPieChart,
} from '../components/Statistics';
import MatchingModal from '../components/MatchMaking/MatchingModal';
import { getUserId, getCookie } from '../utils/helpers';
import { getUser } from '../api/UserApi';
import { errorHandler } from '../utils/errors';
import Header from '../components/Header';
import '../css/Landing.css';

function Landing() {
  const [user, setUser] = useState('');
  const [sessionTime, setSessionTime] = useState('');
  const [isMatchingModalOpen, setMatchingModalOpen] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [session, setSession] = useState({});

  const navigate = useNavigate();

  const handleToggleModal = () => {
    setMatchingModalOpen(!isMatchingModalOpen);
  };

  const getSessionTime = (timestamp) => {
    const dateObject = new Date(timestamp);
    return dateObject.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const handleReturnToSession = () => {
    const { room, question, language, time } = session;
    navigate('/collaboration', {
      state: {
        roomId: room,
        displayName: user.displayName,
        jwt: getCookie(),
        questionData: question,
        language: language,
        time: time,
      },
    });
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

  useEffect(() => {
    const session = sessionStorage.getItem('current_session');
    if (session) {
      const parsedSession = JSON.parse(session);
      setSession(parsedSession);
      setIsSessionActive(true);
      setSessionTime(getSessionTime(parsedSession.time));
    } else {
      setIsSessionActive(false);
    }
  }, []);

  return (
    <div>
      <Header />
      <div className='background'>
        <div className='main'>
          <h1 className='title m-5'>Welcome, {user.displayName}</h1>
          <div className='d-flex align-items-center justify-content-center vertical'>
            {isSessionActive ? (
              <button
                type='button'
                className='btn btn-success w-25 mb-5 shadow'
                disabled={!isSessionActive}
                onClick={handleReturnToSession}>
                Return to {sessionTime} Match
              </button>
            ) : (
              <button
                type='button'
                className='btn btn-success w-25 m-1'
                onClick={handleToggleModal}>
                New Match
              </button>
            )}
            {isMatchingModalOpen && (
              <MatchingModal
                user={user}
                isOpen={isMatchingModalOpen}
                onClose={handleToggleModal}
              />
            )}
          </div>
          <SubmissionPieChart />
          <SubmissionHeatMap />
        </div>
      </div>
    </div>
  );
}

export default Landing;
