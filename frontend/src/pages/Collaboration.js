import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { Chat, CodeEditor, QuestionPanel } from '../components/Collaboration';
import { ChangeQuestionWindow, LeaveRoomWindow } from '../components/ConfirmationWindows';
import { QuestionContent } from '../components/Question';
import { getRandomQuestionByCriteria } from '../api/QuestionApi';
import { showFailureToast } from '../utils/toast';
import { getUserId, removeSessionStorage } from '../utils/helpers';
import { Status, Event } from '../constants';
import env from '../loadEnvironment';
import '../css/Collaboration.css';

const Collaboration = () => {
  const [userId, setUserId] = useState('');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [question, setQuestion] = useState({});
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [isChangeQuestionWindowOpen, setIsChangeQuestionWindowOpen] = useState(false);
  const [isLeaveRoomWindowOpen, setIsLeaveRoomWindowOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const socket = io(env.COLLAB_URL);
  const { roomId, displayName, questionData, jwt, time } = location.state || {};
  const { complexity, language } = questionData || {};

  useEffect(() => {
    const initializeRoom = async () => {
      // If roomId is not present in the location state, redirect to landing page
      if (!roomId) {
        showFailureToast('Unable to join room.');
        navigate('/landing');
        return;
      }

      const userId = await getUserId();
      setUserId(userId);

      try {
        const question = await getRandomQuestionByCriteria(complexity, jwt);
        const socketMessage = {
          room: roomId,
          user: userId,
          question: question,
          language: language,
          displayName: displayName,
        };
        // Join the Socket.io room when the component mounts
        socket.emit(Event.Socket.JOIN_ROOM, socketMessage);

        const session = {
          room: roomId,
          question: question,
          language: language,
          time: time
        }
        sessionStorage.setItem(`current_session`, JSON.stringify(session));
      } catch (error) {
        if (error.response.status === Status.UNAUTHORIZED) {
          navigate('/unauthorized');
        }
      }
    };
    initializeRoom();
    return () => {
      socket.emit(Event.Socket.LEAVE_ROOM, { room: roomId, user: userId, displayName: displayName });
      socket.disconnect();
    }
  }, []);

  const handleOpenPanel = () => {
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
  };

  const handleOpenLeaveRoomWindow = () => {
    setIsLeaveRoomWindowOpen(true);
  }

  // Open the change question window on question change
  const handleQuestionChange = (selectedQuestion) => {
    if (selectedQuestion !== question) {
      setSelectedQuestion(selectedQuestion);
      setIsChangeQuestionWindowOpen(true);
    }
  };

  // Update the question change state when the user changes the question on confirmation
  const handleConfirmQuestionChange = () => {
    setQuestion(selectedQuestion);
    setIsChangeQuestionWindowOpen(false);
    sessionStorage.setItem(`question_${roomId}`, JSON.stringify(selectedQuestion));

    // Send question change to the server
    socket.emit(Event.Question.CHANGE, {
      room: roomId,
      question: selectedQuestion,
    });
    // Broadcast the question change to the chat
    socket.emit(Event.Communication.CHAT_SEND, {
      room: roomId,
      message: {
        text: `Question changed the from ${question.title} to ${selectedQuestion.title}`,
        sender: 'server',
      },
    });
  };

  const handleConfirmLeaveRoom = () => {
    setIsLeaveRoomWindowOpen(false);
    removeSessionStorage();
    socket.emit(Event.Socket.TERMINATE_ROOM, { room: roomId, user: userId, displayName: displayName });
    window.history.replaceState({}, location.state);
    navigate('/landing');
  };

  const handleCancelQuestionChange = () => {
    setIsChangeQuestionWindowOpen(false);
  };

  const handleCancelLeaveRoom = () => {
    setIsLeaveRoomWindowOpen(false);
  };

  // Receive question changes from the server
  useEffect(() => {
    socket.on(Event.Question.UPDATE, (updatedQuestion) => {
      if (updatedQuestion !== question) {
        setQuestion(updatedQuestion);
      }
    });
  }, [socket, question]);

  return (
    <>
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
            <span className='logo'>
              PeerPrep
            </span>
            <button
              type='button'
              className='btn btn-danger'
              onClick={handleOpenLeaveRoomWindow}
            >
              Leave Room
            </button>
          </div>
        </div>
        <div className='collaboration-content'>
          <div className='collaboration-left'>
            {question && (
              <QuestionContent question={question} />
            )}
          </div>
          <div className='collaboration-right'>
            <CodeEditor
              socket={socket}
              roomId={roomId}
              userId={userId}
              displayName={displayName}
              jwt={jwt}
              selectedLanguage={language}
              selectedQuestion={question}
            />
            <Chat socket={socket} roomId={roomId} user={userId} />
          </div>
        </div>
      </div>
      {isPanelOpen && (
        <QuestionPanel
          isOpen={isPanelOpen}
          onClose={handleClosePanel}
          onChangeQuestion={handleQuestionChange}
          complexity={complexity}
        />
      )}
      {isChangeQuestionWindowOpen && (
        <ChangeQuestionWindow
          onConfirm={handleConfirmQuestionChange}
          onClose={handleCancelQuestionChange}
          questionTitle={selectedQuestion.title}
        />
      )}
      {isLeaveRoomWindowOpen && (
        <LeaveRoomWindow
          onConfirm={handleConfirmLeaveRoom}
          onClose={handleCancelLeaveRoom}
        />
      )}
    </>
  );
};

export default Collaboration;
