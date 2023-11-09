import React, { useState, useEffect } from 'react';
import { Event } from '../../constants';
import '../../css/Chat.css';

const Chat = ({ socket, roomId, user }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const getTimestamp = () => {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = (event) => {
    event.preventDefault();

    if (inputMessage) {
      const message = {
        text: inputMessage,
        sender: user,
        timestamp: getTimestamp(),
      };
      socket.emit(Event.Communication.CHAT_SEND, {
        room: roomId,
        message: message,
      });
      setInputMessage('');
    }
  };

  useEffect(() => {
    socket.on(Event.Communication.CHAT_RECEIVE, (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === user
                ? 'self'
                : msg.sender === 'server'
                  ? 'server'
                  : 'other'
              }`}
          >
            {msg.text}
            {msg.timestamp && (
              <small className='timestamp'>{msg.timestamp}</small>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <div className='chat-input'>
          <input
            type='text'
            placeholder='Enter a message'
            value={inputMessage}
            onChange={handleInputChange}
            onKe
          />
          <button type='submit'>Send</button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
