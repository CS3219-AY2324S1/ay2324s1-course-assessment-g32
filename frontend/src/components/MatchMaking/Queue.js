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
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reply = await joinQueue(jwt, queueName, sessionID);
        setStatus(reply.data.response.message);
        setIsLoading(false);

        // Navigate to collaboration page if match is found
        const isMatch = reply.data.response.isMatch;
        if (isMatch) {
          const roomId = reply.data.response.roomId;
          const userId = await getUserId();
          const user = await getUser(userId, getCookie());
          const displayName = user.displayName;

          const questionData = {
            complexity: complexity,
            language: language,
          };

          navigate('/collaboration', {
            state: {
              roomId,
              displayName,
              questionData,
              jwt,
            },
          });
        }
      } catch (error) {
        onCancel();
        errorHandler(error);
      }
    };
    fetchData();
  }, [jwt, sessionID, queueName, complexity, language, navigate]);

  useEffect(() => {
    setTimeout(() => {
      // To get the latest value of isLoading
      setIsLoading((isLoading) => {
        if (isLoading) {
          showFailureToast('Server is not responding. Please try again later.');
          onCancel();
        }
      });
    }, 32000);
  });

  const handleCancelClick = async () => {
    try {
      await exitQueue(jwt, queueName, sessionID);
      onCancel();
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
        <button className='btn btn-secondary' onClick={handleCancelClick}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Queue;
