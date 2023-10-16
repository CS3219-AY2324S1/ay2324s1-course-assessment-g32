import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import Chat from '../../components/Collaboration/Chat/Chat';
import CodeEditor from '../../components/Collaboration/CodeEditor/CodeEditor';
import QuestionContent from '../../components/Question/QuestionContent/QuestionContent';
import './Collaboration.css';
const env = require('../loadEnvironment.js');

const Collaboration = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const roomId = location.state?.roomId;
  const hostId = location.state?.hostId;
  const matchedHostId = location.state?.matchedHostId;
  const question = location.state?.question;

  // Check if the user is authenticated before connecting to the socket server
  const socket = io(env.COLLAB_URL);

  useEffect(() => {
    // Join the Socket.io room when the component mounts
    socket.emit('joinRoom', { room: roomId, host: hostId });
  }, []);

  const handleLeaveRoom = () => {
    socket.emit('leaveRoom', { room: roomId, host: hostId });
    navigate('/landing');
  };

  return (
    <div className="collaboration-container">
      <div className="header">
        <h1>Collaboration</h1>
      </div>
      <div className="content">
        <div className="left">
          <QuestionContent question={question} />
        </div>
        <div className="right">
          <CodeEditor socket={socket} roomId={roomId} />
          <Chat socket={socket} roomId={roomId} host={hostId} />
        </div>
      </div>
      <div>
        <button onClick={handleLeaveRoom}>Leave Room</button>
      </div>
    </div>
  );
};

export default Collaboration;
