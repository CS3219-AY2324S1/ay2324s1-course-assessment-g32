import React, { useState, useEffect, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import CollapsibleOutput from './CollapsibleOutput';
import OverlayCursor from './OverlayCursor';
import { ChangeLanguageWindow, ResetCodeWindow } from '../ConfirmationWindows';
import { executeCode } from '../../api/ExecutionApi';
import { attemptQuestion } from '../../api/HistoryApi';
import { showSuccessToast } from '../../utils/toast';
import { errorHandler } from '../../utils/errors';
import { isWithinWindow, getBoilerplate, getLanguageExtension } from '../../utils/helpers';
import { Event } from '../../constants';
import '../../css/CodeEditor.css';

const CodeEditor = ({ socket, roomId, userId, displayName, jwt, selectedLanguage, selectedQuestion }) => {
  const editorBoxRef = useRef(null);
  const codeMirrorRef = useRef(null);

  // Initialize code editor content
  const [code, setCode] = useState(getBoilerplate(selectedLanguage));
  const [result, setResult] = useState({});
  const [language, setLanguage] = useState(selectedLanguage);
  const [newSelectedLanguage, setNewSelectedLanguage] = useState(selectedLanguage);
  const [isChangeLanguageWindowOpen, setIsChangeLanguageWindowOpen] = useState(false);
  const [isResetCodeWindowOpen, setIsResetCodeWindowOpen] = useState(false);

  // Initialize cursor position for code editor
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [partner, setPartner] = useState({
    user: '',
    position: { x: 0, y: 0 },
  });
  const [renderPartner, setRenderPartner] = useState({
    user: '',
    position: { x: 0, y: 0 },
  });
  const [showCursor, setShowCursor] = useState(false);

  // Initialize states for code execution
  const [isExecuting, setIsExecuting] = useState(false);

  const broadcastMousePosition = () => {
    if (editorBoxRef.current) {
      const relativePosition = getRelativePosition(position);
      socket.emit(Event.Mouse.POSITION, {
        room: roomId,
        user: displayName,
        jwt: jwt,
        position: relativePosition,
      });
    }
  };

  // Convert absolute position to relative position
  const getRelativePosition = (absolutePosition) => {
    if (editorBoxRef.current) {
      const { top, left } = editorBoxRef.current.getBoundingClientRect();
      return {
        x: absolutePosition.x - left + scrollLeft,
        y: absolutePosition.y - top + scrollTop,
      };
    }
  };

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
    broadcastMousePosition();
  };

  const handleMouseLeave = () => {
    socket.emit(Event.Mouse.LEAVE, {
      room: roomId,
      jwt: jwt,
    });
  };

  const handleScroll = (event) => {
    const { scrollTop, scrollLeft } = event.target;
    setScrollTop(scrollTop);
    setScrollLeft(scrollLeft);
    broadcastMousePosition();
  };

  // Update the code state when the user types
  const onChange = (update) => {
    setCode(update);

    // Send code changes to the server
    socket.emit(Event.Code.CHANGE, {
      room: roomId,
      updatedCode: update,
    });
  };

  // Open the change language window on language change
  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    if (selectedLanguage !== language) {
      setNewSelectedLanguage(selectedLanguage);
      setIsChangeLanguageWindowOpen(true);
    }
  };

  // Update the language state when the user changes the language on confirmation
  const handleConfirmLanguageChange = () => {
    setLanguage(newSelectedLanguage);
    setIsChangeLanguageWindowOpen(false);

    // Send language changes to the server
    socket.emit(Event.Language.CHANGE, {
      room: roomId,
      updatedLanguage: newSelectedLanguage,
    });
    // Broadcast the language change to the chat
    socket.emit(Event.Communication.CHAT_SEND, {
      room: roomId,
      message: {
        text: `Language changed the from ${language} to ${newSelectedLanguage}`,
        sender: 'server',
      },
    });
  };

  // Revert the language to the previous language and close the change language window on cancellation
  const handleCancelLanguageChange = () => {
    const languageSelect = document.getElementById('languageSelect');
    languageSelect.value = language;
    setIsChangeLanguageWindowOpen(false);
  };

  const handleResetCode = () => {
    setIsResetCodeWindowOpen(true);
  };

  const confirmResetCode = () => {

    // Send reset change to the server
    socket.emit(Event.Code.RESET, {
      room: roomId,
      language: language,
    });
    setIsResetCodeWindowOpen(false);
  };

  const cancelResetCode = () => {
    setIsResetCodeWindowOpen(false);
  };

  const handleCodeExecution = async () => {
    try {
      setIsExecuting(true);
      // Send button disabling signal to the server
      socket.emit(Event.Button.DISABLE_EXEC, {
        roomId: roomId,
        isButtonDisabled: true,
      });

      const result = await executeCode(language, code);
      setResult(result);

      // Send execution results to the server
      socket.emit(Event.Result.CHANGE, {
        room: roomId,
        updatedResult: result,
      });
      return result;
    } catch (err) {
      errorHandler(err);
    } finally {
      // Allow the user to execute code again after 200ms
      await new Promise(r => setTimeout(r, 200));
      setIsExecuting(false);
      // Send button un-disabling signal to the server
      socket.emit(Event.Button.DISABLE_EXEC, {
        roomId: roomId,
        isButtonDisabled: false,
      });
    }
  };

  const handleSubmitAttempt = async () => {
    try {
      const executionResult = await handleCodeExecution();
      const questionId = selectedQuestion._id;
      const response = await attemptQuestion(jwt, userId, questionId, code, language, executionResult);
      showSuccessToast(response.data.message);
    } catch (err) {
      errorHandler(err);
    }
  };

  // Add event listeners for scroll events in the code editor
  useEffect(() => {
    if (codeMirrorRef.current) {
      const view = codeMirrorRef.current.view;
      view?.scrollDOM.addEventListener('scroll', handleScroll);
    }
  }, [codeMirrorRef?.current?.view]);

  // Render the partner's cursor
  useEffect(() => {
    if (editorBoxRef.current) {
      const { top, left } = editorBoxRef.current.getBoundingClientRect();
      const newPartnerCursor = {
        user: partner.user,
        position: {
          x: partner?.position?.x + left - scrollLeft,
          y: partner?.position?.y + top - scrollTop,
        },
      };
      setRenderPartner(newPartnerCursor);
    }
  }, [scrollTop, scrollLeft, partner]);

  useEffect(() => {
    // Receive code changes from the server
    socket.on(Event.Code.UPDATE, (updatedCode) => {
      setCode(updatedCode);
    });
    // Receive language changes from the server
    socket.on(Event.Language.UPDATE, (updatedLanguage) => {
      const languageSelect = document.getElementById('languageSelect');
      if (languageSelect) {
        languageSelect.value = updatedLanguage;
        setLanguage(updatedLanguage);
      }
    });
    // Receive result changes from the server
    socket.on(Event.Result.UPDATE, (updatedResult) => {
      setResult(updatedResult);
    });
    // Receive button disabling signal from the server
    socket.on(Event.Button.UPDATE_EXEC, (isButtonDisabled) => {
      setIsExecuting(isButtonDisabled);
    });
    // Receive mouse position changes from the server
    socket.on(Event.Mouse.POSITION, (data) => {
      if (data.jwt !== jwt) {
        setShowCursor(true);
        setPartner(data);
      }
    });
    // Receive mouse leave events from the server
    socket.on(Event.Mouse.LEAVE, (data) => {
      if (data.jwt !== jwt) {
        setShowCursor(false);
      }
    });
  }, [socket]);

  // Hide the partner's cursor after 5 seconds of inactivity
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowCursor(false);
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [showCursor]);

  return (
    <>
      <div className='editor-container'>
        <div className='row editor-nav-bar'>
          <div className='d-flex justify-content-between'>
            <div className='d-flex'>
              <select
                className='form-select-sm me-2'
                id='languageSelect'
                onChange={handleLanguageChange}
              >
                <option value='Python'>Python</option>
                <option value='Java'>Java</option>
                <option value='Javascript'>Javascript</option>
              </select>
              <button
                type='button'
                className={`btn btn-secondary`}
                onClick={handleResetCode}
              >
                ↺ Reset
              </button>
            </div>
            <div className='d-flex'>
              <button
                type='button'
                className={`btn ${isExecuting ? 'btn-secondary' : 'btn-primary'} me-2`}
                onClick={handleCodeExecution}
                disabled={isExecuting}
              >
                ▶ Run
              </button>
              <button
                type='button'
                className={`btn ${isExecuting ? 'btn-secondary' : 'btn-success'}`}
                onClick={handleSubmitAttempt}
                disabled={isExecuting}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <div
          className='code-editor'
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          ref={editorBoxRef}
        >
          <CodeMirror
            className='code-mirror'
            ref={codeMirrorRef}
            value={code}
            onChange={onChange}
            theme={vscodeDark}
            autoFocus={true}
            height='100%'
            placeholder='Enter your code here...'
            basicSetup={{
              foldGutter: false,
            }}
            extensions={[getLanguageExtension(language)]}
          />
          {isWithinWindow(renderPartner.position, editorBoxRef) && showCursor && (
            <OverlayCursor partner={renderPartner} />
          )}
        </div>
        <CollapsibleOutput result={result} />
      </div>
      {isChangeLanguageWindowOpen && (
        <ChangeLanguageWindow
          onClose={handleCancelLanguageChange}
          onConfirm={handleConfirmLanguageChange}
          oldLanguage={language}
          newLanguage={newSelectedLanguage}
        />
      )}
      {isResetCodeWindowOpen && (
        <ResetCodeWindow
          onClose={cancelResetCode}
          onConfirm={confirmResetCode}
        />
      )}
    </>
  );
};

export default CodeEditor;
