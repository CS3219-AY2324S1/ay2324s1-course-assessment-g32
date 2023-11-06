import React, { useState, useEffect, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { javascript } from '@codemirror/lang-javascript';
import OutputTextArea from './OutputTextArea';
import { executeCode } from '../../api/ExecutionApi';
import { Language, Event } from '../../constants';
import { errorHandler } from '../../utils/errors';
import OverlayCursor from './OverlayCursor';
import { isWithinWindow } from '../../utils/helpers';
import { JAVA_BOILERPLATE } from '../../constants';
import '../../css/CodeEditor.css';

const CodeEditor = ({ socket, roomId, selectedLanguage, displayName, jwt }) => {
  const editorBoxRef = useRef(null);

  // Initialize code editor content
  const [code, setCode] = useState(selectedLanguage === Language.JAVA ? JAVA_BOILERPLATE : '');
  const [result, setResult] = useState('');
  const [language, setLanguage] = useState(selectedLanguage);

  // Initialize cursor position for code editor
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [partner, setPartner] = useState({});
  const [renderPartner, setRenderPartner] = useState({});
  const [showCursor, setShowCursor] = useState(false);

  // Initialize states for code execution
  const [isExecuting, setIsExecuting] = useState(false);
  const [isOutputCollapsed, setIsOutputCollapsed] = useState(false);

  const getLanguageExtension = (selectedLanguage) => {
    switch (selectedLanguage) {
      case Language.PYTHON:
        return python();
      case Language.JAVA:
        return java();
      case Language.JS:
        return javascript();
      default:
        return python();
    }
  };

  const broadcastMousePosition = () => {
    if (editorBoxRef.current) {
      const relativePosition = getRelativePosition(position);
      socket.emit(Event.Collaboration.MOUSE_POSITION, {
        room: roomId,
        user: displayName,
        jwt: jwt,
        position: relativePosition,
      });
    }
  };

  // Convert relative position to absolute position
  const getAbsolutePosition = (relativePosition) => {
    if (editorBoxRef.current) {
      const { top, left } = editorBoxRef.current.getBoundingClientRect();
      return {
        x: relativePosition.x + left - scrollLeft,
        y: relativePosition.y + top - scrollTop,
      };
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
    socket.emit(Event.Collaboration.MOUSE_LEAVE, {
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
    sessionStorage.setItem(`codeEditorContent_${roomId}`, update); // Store the code in session storage

    // Send code changes to the server
    socket.emit(Event.Collaboration.CODE_CHANGE, {
      room: roomId,
      updatedCode: update,
    });
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);

    // Set the code to boilerplate code if Java; else, set it to empty string
    const codeToStore =
      selectedLanguage === Language.JAVA ? JAVA_BOILERPLATE : '';
    setCode(codeToStore);

    sessionStorage.setItem(`codeEditorContent_${roomId}`, codeToStore);
    sessionStorage.setItem(`codeEditorLanguage_${roomId}`, selectedLanguage); // Store the language in session storage

    // Send language changes to the server
    socket.emit(Event.Collaboration.LANGUAGE_CHANGE, {
      room: roomId,
      updatedLanguage: selectedLanguage,
    });
    // Send code changes to the server
    socket.emit(Event.Collaboration.CODE_CHANGE, {
      room: roomId,
      updatedCode: codeToStore,
    });
  };

  const handleCodeExecution = async () => {
    try {
      setIsExecuting(true);

      const result = await executeCode(language, code);
      setResult(result);

      // Send execution results to the server
      socket.emit(Event.Collaboration.RESULT_CHANGE, {
        room: roomId,
        updatedResult: result,
      });
    } catch (err) {
      errorHandler(err);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleToggleOutputCollapse = () => {
    setIsOutputCollapsed(!isOutputCollapsed);
  };

  // Retrieve the stored code from session storage (e.g. when the user refreshes the page)
  useEffect(() => {
    const storedContent = sessionStorage.getItem(`codeEditorContent_${roomId}`);
    if (storedContent) {
      setCode(storedContent);
    }
  }, []);

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
    socket.on(Event.Collaboration.CODE_UPDATE, (updatedCode) => {
      setCode(updatedCode);
      sessionStorage.setItem(`codeEditorContent_${roomId}`, updatedCode);
    });
    // Receive language changes from the server
    socket.on(Event.Collaboration.LANGUAGE_UPDATE, (updatedLanguage) => {
      const languageSelect = document.getElementById('languageSelect');
      if (updatedLanguage !== languageSelect.value) {
        languageSelect.value = updatedLanguage;
        setLanguage(updatedLanguage);
        sessionStorage.setItem(`codeEditorLanguage_${roomId}`, updatedLanguage);
      }
    });
    // Receive mouse position changes from the server
    socket.on(Event.Collaboration.MOUSE_POSITION, (data) => {
      if (data.jwt !== jwt) {
        setShowCursor(true);
        setPartner(data);
      }
    });
    // Receive mouse leave events from the server
    socket.on(Event.Collaboration.MOUSE_LEAVE, (data) => {
      if (data.jwt !== jwt) {
        setShowCursor(false);
      }
    });
    // Receive result changes from the server
    socket.on(Event.Collaboration.RESULT_UPDATE, (updatedResult) => {
      setResult(updatedResult);
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
    <div className='editor-container'>
      <div className='row editor-nav-bar'>
        <div className='d-flex flex-wrap gap-1'>
          <select
            className='form-select-sm'
            id='languageSelect'
            defaultValue={language}
            onChange={handleLanguageChange}
          >
            <option value='Python'>Python</option>
            <option value='Java'>Java</option>
            <option value='Javascript'>Javascript</option>
          </select>
          <button
            className={`btn ${
              isExecuting ? 'btn-secondary' : 'btn-success'
            } me-2`}
            onClick={handleCodeExecution}
            disabled={isExecuting}
          >
            ▶ Run
          </button>
        </div>
      </div>
      <div
        className='code-editor'
        onScroll={handleScroll}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        ref={editorBoxRef}
      >
        <CodeMirror
          value={code}
          onChange={onChange}
          theme={vscodeDark}
          autoFocus={true}
          height='100%'
          placeholder='Enter your code here...'
          extensions={[getLanguageExtension(language)]}
        />
        {isWithinWindow(renderPartner.position, editorBoxRef) && showCursor && (
          <OverlayCursor partner={renderPartner} />
        )}
      </div>
      <button
        className='btn btn-secondary'
        onClick={handleToggleOutputCollapse}
      >
        <span style={{ float: 'left' }}>Result</span>
        <span style={{ float: 'right' }}>{isOutputCollapsed ? '+' : '-'}</span>
      </button>
      <div
        className={`collapse ${isOutputCollapsed ? '' : 'show'}`}
        id='collapseExample'
      >
        <OutputTextArea result={result} />
      </div>
    </div>
  );
};

export default CodeEditor;
