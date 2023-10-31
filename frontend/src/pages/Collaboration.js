import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { Chat, CodeEditor, SlidingPanel } from '../components/Collaboration';
import { QuestionContent } from '../components/Question';
import { showFailureToast } from '../utils/toast';
import { Event } from '../constants';
import env from '../loadEnvironment';
import '../css/Collaboration.css';

const Collaboration = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const socket = io(env.COLLAB_URL);
  const { roomId, displayName, questionData } = location.state || {};
  const { question, complexity, language } = questionData || {};

  useEffect(() => {
    // If roomId is not present in the location state, redirect to landing page
    if (!roomId) {
      showFailureToast('Invalid Room');
      navigate('/landing');
    }

    // Join the Socket.io room when the component mounts
    socket.emit(Event.JOIN_ROOM, { room: roomId, user: displayName });
    socket.emit(Event.Question.QUESTION_CHANGE, {
      room: roomId,
      question: question,
    });
  }, []);

  const handleLeaveRoom = () => {
    sessionStorage.removeItem(`codeEditorContent_${roomId}`); // Remove CodeMirror content from session storage when leaving the room
    socket.emit(Event.LEAVE_ROOM, { room: roomId, user: displayName });
    navigate('/landing');
  };

  const handleOpenPanel = () => {
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
  };

  // Send question changes to the server
  const handleQuestionChange = (question) => {
    setSelectedQuestion(question);
    socket.emit(Event.Question.QUESTION_CHANGE, {
      room: roomId,
      question: question,
    });
  };

  // Receive question changes from the server
  useEffect(() => {
    socket.on(Event.Question.QUESTION_UPDATE, (updatedQuestion) => {
      if (selectedQuestion !== updatedQuestion) {
        setSelectedQuestion(updatedQuestion);
      }
    });
  }, [selectedQuestion, socket]);

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
            <CodeEditor
              socket={socket}
              roomId={roomId}
              selectedLanguage={language}
            />
            <Chat socket={socket} roomId={roomId} user={displayName} />
          </div>
        </div>
      </div>
      {isPanelOpen && (
        <SlidingPanel
          isOpen={isPanelOpen}
          onClose={handleClosePanel}
          onChangeQuestion={handleQuestionChange}
          complexity={complexity}
        />
      )}
    </div>
  );
};

export default Collaboration;
