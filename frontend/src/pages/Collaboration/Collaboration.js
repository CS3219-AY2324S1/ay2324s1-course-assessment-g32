import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Chat from '../../components/Collaboration/Chat/Chat';
import CodeEditor from '../../components/Collaboration/CodeEditor/CodeEditor';
import io from 'socket.io-client';
import './Collaboration.css';

const Collaboration = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const roomId = location.state?.roomId;
  const hostId = location.state?.hostId;
  const matchedHostId = location.state?.matchedHostId;

  const socket = io('http://localhost:3002');

  useEffect(() => {
    // Join the Socket.io room when the component mounts
    socket.emit('joinRoom', { room: roomId, host: hostId });
  }, []);

  const handleLeaveRoom = () => {
    socket.emit('leaveRoom', { room: roomId, host: hostId });
    navigate('/landing');
  };

  return (
    <div className="container">
      <div className="left">
      </div>
      <div className="right">
        <CodeEditor socket={socket} roomId={roomId} />
        <Chat socket={socket} roomId={roomId} host={hostId} />
      </div>
    </div>
  );
};

export default Collaboration;
