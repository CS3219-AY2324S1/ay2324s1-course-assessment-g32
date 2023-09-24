import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const Collaboration = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const roomId = location.state?.roomId;

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const socket = io('http://localhost:3002');

  useEffect(() => {
    // Replace with your Socket.io server URL

    const roomName = roomId

    // Join the Socket.io room when the component mounts
    socket.emit('joinRoom', roomName);

    // Listen for incoming messages from the server

    socket.on('message', (message) => {
      console.log('message:', message)
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const sendMessage = () => {
    if (message) {
      socket.emit('chatMessage', { room: roomId, message });
      setMessage('');
    }
  };

  const handleLeaveRoom = () => {
    socket.emit('leaveRoom', roomId);
    navigate('/match-making');
  };

  return (
    <div>
      <h1>RoomID: {roomId}</h1>
      <div>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
        <button onClick={handleLeaveRoom}>Leave Room</button>
      </div>
    </div>
  );
};

export default Collaboration;
