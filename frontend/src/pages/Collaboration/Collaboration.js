import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Chat from '../../components/Collaboration/Chat';
import io from 'socket.io-client';

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
    <div>
      <h1>RoomID: {roomId}</h1>
      <h2>You have been match with Host {matchedHostId}</h2>
      <Chat socket={socket} roomId={roomId} />
      <button onClick={handleLeaveRoom}>Leave Room</button>
    </div>
  );
};

export default Collaboration;
