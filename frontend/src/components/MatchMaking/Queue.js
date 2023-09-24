import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { joinQueue, exitQueue } from '../../api/QueueApi.js';
import { errorHandler } from '../../utils/errors.js';

const Queue = ({ user }) => {

  const [status, setStatus] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { difficulty } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reply = await joinQueue(user, difficulty);
        setStatus(reply.data.response.message);
        setIsLoading(false);

        // navigate to collaboration page when match is found
        if (reply.data.response.isMatch) {
          const roomId = reply.data.response.roomId;
          console.log(`Match found! RoomId: ${roomId}`)
          navigate('/collaboration', { state: { roomId } });
        }
      } catch (error) {
        errorHandler(error);
      }
    };
    fetchData();
  }, [user, difficulty]);

  const handleCancelClick = () => {
    try {
      exitQueue(user, difficulty);
    } catch (error) {
      errorHandler(error);
    }
  };

  return isLoading ? (
    <div className='container'>
      <div className='row d-flex justify-content-center' style={{ marginTop: '10px' }}>
        <div className='spinner-border text-primary' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
        <button className='btn btn-danger' onClick={handleCancelClick} >Cancel</button>
      </div>
    </div>
  ) : (
    <div className='container'>
      <div className='row' style={{ marginTop: '10px' }}>
        <h1>{status}</h1>
      </div>
    </div>
  );

}

export default Queue;
