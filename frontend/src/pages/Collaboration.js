import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { Chat, CodeEditor, QuestionPanel } from '../components/Collaboration';
import { QuestionContent } from '../components/Question';
import { getRandomQuestionByCriteria } from '../api/QuestionApi';
import { showFailureToast } from '../utils/toast';
import { attemptQuestion } from '../api/HistoryApi';
import { showSuccessToast } from '../utils/toast';
import { errorHandler } from '../utils/errors';
import { getCookie, getUserId } from '../utils/helpers';
import { Status, Event } from '../constants';
import env from '../loadEnvironment';
import '../css/Collaboration.css';

const Collaboration = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const socket = io(env.COLLAB_URL);
  const { roomId, displayName, questionData, jwt } = location.state || {};
  const { complexity, language } = questionData || {};

  const [userId, setUserId] = useState('');
  const [jwtToken, setJwtToken] = useState('');
  const [code, setCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState({});

  useEffect(() => {
    const initializeRoom = async () => {
      // If roomId is not present in the location state, redirect to landing page
      if (!roomId) {
        showFailureToast('Invalid Room');
        navigate('/landing');
      }

      setJwtToken(await getCookie());
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
      setSelectedQuestion(question);
    };
    initializeRoom();
  }, []);

  const handleLeaveRoom = () => {
    sessionStorage.removeItem(`codeEditorContent_${roomId}`); // Remove CodeMirror content from session storage when leaving the room
    socket.emit(Event.Socket.LEAVE_ROOM, { room: roomId, user: displayName });
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
    if (question !== selectedQuestion) {
      setSelectedQuestion(question);
      socket.emit(Event.Question.CHANGE, {
        room: roomId,
        question: question,
      });
    }
  };

  // Retrieve last language used from session storage
  const retrieveLanguage = () => {
    const storedLanguage = sessionStorage.getItem(`codeEditorLanguage_${roomId}`);
    return storedLanguage ? storedLanguage : language;
  };

  const submitAttempt = async () => {
    try {
      const questionId = selectedQuestion._id;
      const response = await attemptQuestion(jwtToken, userId, questionId, code, selectedLanguage);
      showSuccessToast(response.data.message);
    } catch (err) {
      errorHandler(err);
    }
  };

  // Receive question changes from the server
  useEffect(() => {
    socket.on(Event.Question.UPDATE, (updatedQuestion) => {
      if (updatedQuestion !== selectedQuestion) {
        setSelectedQuestion(updatedQuestion);
        sessionStorage.setItem(
          `question_${roomId}`,
          JSON.stringify(updatedQuestion)
        );
      }
    });
  }, [socket, selectedQuestion]);

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
            <button
              type='button'
              className='btn btn-success'
              onClick={submitAttempt}
            >
              Submit
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
              selectedLanguage={retrieveLanguage()}
              displayName={displayName}
              jwt={jwt}
              handleCodeChange={setCode}
              handleLanguageToggle={setSelectedLanguage}
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
    </div>
  );
};

export default Collaboration;
