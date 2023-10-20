import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import Chat from '../../components/Collaboration/Chat/Chat';
import CodeEditor from '../../components/Collaboration/CodeEditor/CodeEditor';
import SlidingPanel from '../../components/Collaboration/SlidingPanel/SlidingPanel';
import QuestionContent from '../../components/Question/QuestionContent/QuestionContent';
import './Collaboration.css';
import env from '../../loadEnvironment';

const Collaboration = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

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
    setSelectedQuestion(question);
  }, []);

  const handleLeaveRoom = () => {
    socket.emit('leaveRoom', { room: roomId, host: hostId });
    navigate('/landing');
  };

  const handleOpenPanel = () => {
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
  };

  const handleQuestionSelect = (question) => {
    setSelectedQuestion(question);

    // Send question changes to the server
    socket.emit('questionChange', { room: roomId, question: question });
  };

  // Receive question changes from the server
  useEffect(() => {
    socket.on('questionUpdate', (updatedQuestion) => {
      setSelectedQuestion(updatedQuestion);
    });
  }, []);

  return (
    <div>
      <div className='collaboration-container'>
        <div className='collaboration-header'>
          <div className='d-flex justify-content-between'>
            <button
              type='button'
              className='btn btn-primary me-2'
              onClick={handleOpenPanel}
            >
              Change Question
            </button>
            <button
              type='button'
              className='btn btn-danger'
              onClick={handleLeaveRoom}
            >
              Leave Room
            </button>
          </div>
        </div>
        <div className='content'>
          <div className='left'>
            {selectedQuestion && (
              <QuestionContent question={selectedQuestion} />
            )}
          </div>
          <div className='right'>
            <CodeEditor socket={socket} roomId={roomId} />
            <Chat socket={socket} roomId={roomId} host={hostId} />
          </div>
        </div>
      </div>
      {isPanelOpen && (
        <SlidingPanel
          isOpen={isPanelOpen}
          onClose={handleClosePanel}
          onSelectQuestion={handleQuestionSelect}
        />
      )}
    </div>
  );
};

export default Collaboration;
