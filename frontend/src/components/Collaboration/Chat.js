import React, { useState, useEffect } from 'react';

const Chat = ({ socket, roomId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', (message) => {
      console.log('message:', message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const sendMessage = () => {
    if (message) {
      socket.emit('chatMessage', { room: roomId, message });
      setMessage('');
    }
  };

  return (
    <div className="border p-5" style={{ width: '80%' }}>
      <h1>Chat</h1>
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
      </div>
    </div>
  );
};

export default Chat;
