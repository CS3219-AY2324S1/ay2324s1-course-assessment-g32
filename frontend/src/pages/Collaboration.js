import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { Chat, CodeEditor, QuestionPanel } from '../components/Collaboration';
import { ChangeQuestionWindow } from '../components/ConfirmationWindows';
import { QuestionContent } from '../components/Question';
import { getRandomQuestionByCriteria } from '../api/QuestionApi';
import { showFailureToast } from '../utils/toast';
import { getUserId } from '../utils/helpers';
import { Status, Event } from '../constants';
import env from '../loadEnvironment';
import '../css/Collaboration.css';

const Collaboration = () => {
  const [userId, setUserId] = useState('');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [question, setQuestion] = useState({});
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [isChangeQuestionWindowOpen, setIsChangeQuestionWindowOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const socket = io(env.COLLAB_URL);
  const { roomId, displayName, questionData, jwt } = location.state || {};
  const { complexity, language } = questionData || {};

  useEffect(() => {
    const initializeRoom = async () => {
      // If roomId is not present in the location state, redirect to landing page
      if (!roomId) {
        showFailureToast('Invalid Room');
        navigate('/dashboard');
      }

      setUserId(await getUserId());

      // Join the Socket.io room when the component mounts
      socket.emit(Event.Socket.JOIN_ROOM, { room: roomId, user: displayName });

      const storedQuestion = sessionStorage.getItem(`question_${roomId}`);
      let question = JSON.parse(storedQuestion);

      if (!question) {
        // If the question is not in sessionStorage, generate and store it
        try {
          question = await getRandomQuestionByCriteria(complexity, jwt);
        } catch (error) {
          if (error.response.status === Status.UNAUTHORIZED) {
            navigate('/unauthorized');
          }
        }

        sessionStorage.setItem(`question_${roomId}`, JSON.stringify(question));
        socket.emit(Event.Question.CHANGE, {
          room: roomId,
          question: question,
        });
      }
      setQuestion(question);
    };
    initializeRoom();
  }, []);

  const handleLeaveRoom = () => {
    sessionStorage.removeItem(`codeEditorContent_${roomId}`); // Remove CodeMirror content from session storage when leaving the room
    socket.emit(Event.Socket.LEAVE_ROOM, { room: roomId, user: displayName });
    navigate('/dashboard');
  };

  const handleOpenPanel = () => {
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
  };

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

  const handleCancelQuestionChange = () => {
    setIsChangeQuestionWindowOpen(false);
  };

  // Retrieve last language used from session storage
  const retrieveLanguage = () => {
    const storedLanguage = sessionStorage.getItem(`codeEditorLanguage_${roomId}`);
    return storedLanguage ? storedLanguage : language;
  };

  // Receive question changes from the server
  useEffect(() => {
    socket.on(Event.Question.UPDATE, (updatedQuestion) => {
      if (updatedQuestion !== question) {
        setQuestion(updatedQuestion);
        sessionStorage.setItem(
          `question_${roomId}`,
          JSON.stringify(updatedQuestion)
        );
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
            <button
              type='button'
              className='btn btn-danger'
              onClick={handleLeaveRoom}
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
              selectedLanguage={retrieveLanguage()}
              selectedQuestion={question}
            />
            <Chat socket={socket} roomId={roomId} user={displayName} />
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
    </>
  );
};

export default Collaboration;
