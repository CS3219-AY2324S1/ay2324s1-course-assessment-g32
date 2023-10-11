import React, { useState, useEffect } from 'react';
import './Chat.css';

const Chat = ({ socket, roomId, host }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const getTimestamp = () => {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputMessage) {
      const message = {
        text: inputMessage,
        sender: host,
        timestamp: getTimestamp(),
      };
      socket.emit('chatMessage', { room: roomId, message: message });
      setInputMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === host ? 'self' : 'other'}`}
          >
            {msg.text}
            {msg.timestamp && (
              <small className="timestamp">{msg.timestamp}</small>
            )}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Enter a message"
          value={inputMessage}
          onChange={handleInputChange}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
