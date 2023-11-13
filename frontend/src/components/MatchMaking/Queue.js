import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CountdownTimer from '../CountdownTimer';
import { joinQueue, exitQueue } from '../../api/MatchApi';
import { getUser } from '../../api/UserApi';
import { getCookie, getUserId } from '../../utils/helpers';
import { errorHandler } from '../../utils/errors';
import { showFailureToast } from '../../utils/toast';

const Queue = ({ jwt, sessionID, onCancel, queueName, complexity, language }) => {
  const [status, setStatus] = useState({});
  const [showButtons, setShowButtons] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const initiateMatch = async () => {
    try {
      const reply = await joinQueue(jwt, queueName, sessionID);
      setStatus(reply.data.response.message);
      setIsLoading(false);

      // Navigate to collaboration page if match is found
      const isMatch = reply.data.response.isMatch;
      setShowButtons(!isMatch);
      if (isMatch) {
        const roomId = reply.data.response.roomId;
        const userId = await getUserId();
        const user = await getUser(userId, getCookie());
        const displayName = user.displayName;
        const time = Date.now();

        const session = {
          room: roomId,
          time: time,
          complexity: complexity,
        }

        sessionStorage.setItem(`current_session`, JSON.stringify(session));

        const questionData = {
          complexity: complexity,
          language: language,
        };

        // Generates a random delay between 0 and 200 milliseconds to avoid users joining the room at the same time
        const randomDelay = Math.random() * 200;
        const randomTimeout = setTimeout(() => {
          navigate('/collaboration', {
            state: {
              roomId,
              displayName,
              questionData,
              jwt,
            },
          });
        }, randomDelay);
        return () => clearTimeout(randomTimeout);
      }
    } catch (error) {
      onCancel();
      errorHandler(error);
    }
  };

  // Join queue on component mount
  useEffect(() => {
    initiateMatch();
  }, [jwt, sessionID, queueName, complexity, language, navigate]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        showFailureToast('Server is not responding. Please try again later.');
        onCancel();
      }
    }, 32000);

    return () => clearTimeout(timeoutId); // Clear the timeout when the component unmounts
  }, [isLoading, onCancel]);


  const handleCancelClick = async () => {
    try {
      await exitQueue(jwt, queueName, sessionID);
      onCancel();
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleRetryClick = async () => {
    try {
      await exitQueue(jwt, queueName, sessionID);
      setIsLoading(true);
      initiateMatch();
    } catch (error) {
      errorHandler(error);
    }
  };

  return isLoading ? (
    <div className='container'>
      <div
        className='row d-flex justify-content-center gap-3'
        style={{ marginTop: '10px' }}
      >
        <CountdownTimer duration={30} />
        <button className='btn btn-danger' onClick={handleCancelClick}>
          Cancel
        </button>
      </div>
    </div>
  ) : (
    <div className='container'>
      <div className='row text-center'>
        <p>{status}</p>
        {showButtons && (
          <div className='d-flex justify-content-between'>
            <button className='btn btn-secondary' onClick={handleCancelClick}>
              Back
            </button>
            <button className='btn btn-success' onClick={handleRetryClick}>
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Queue;
