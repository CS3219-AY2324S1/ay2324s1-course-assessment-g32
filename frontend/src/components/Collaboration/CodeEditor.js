import React, { useState, useEffect, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { Language, Event } from '../../constants';
import OverlayCursor from './OverlayCursor';
import { isWithinWindow } from '../../utils/helpers';
import '../../css/CodeEditor.css';

const CodeEditor = ({ socket, roomId, selectedLanguage, displayName, jwt }) => {
  const editorBoxRef = useRef(null);

  // Initialize code editor content
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState(selectedLanguage);

  // Initialize cursor position for code editor
  const [scrollTop, setScrollTop] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opponent, setOpponent] = useState({});
  const [renderOpponent, setRenderOpponent] = useState({});
  const [showCursor, setShowCursor] = useState(false);

  const getLanguageExtension = (selectedLanguage) => {
    switch (selectedLanguage) {
      case Language.PYTHON:
        return python();
      case Language.JAVA:
        return java();
      case Language.CPP:
        return cpp();
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
      return { x: relativePosition.x + left, y: relativePosition.y + top - scrollTop };
    }
  };

  // Convert absolute position to relative position
  const getRelativePosition = (absolutePosition) => {
    if (editorBoxRef.current) {
      const { top, left } = editorBoxRef.current.getBoundingClientRect();
      return { x: absolutePosition.x - left, y: absolutePosition.y - top + scrollTop };
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
    const { scrollTop } = event.target;
    setScrollTop(scrollTop);
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
    sessionStorage.setItem(`codeEditorLanguage_${roomId}`, selectedLanguage); // Store the language in session storage

    // Send language changes to the server
    socket.emit(Event.Collaboration.LANGUAGE_CHANGE, {
      room: roomId,
      updatedLanguage: selectedLanguage,
    });
  };

  // Render the opponent's cursor
  useEffect(() => {
    if (editorBoxRef.current) {
      const { top, left } = editorBoxRef.current.getBoundingClientRect();
      const newOpponentCursor = {
        user: opponent.user,
        position: {
          x: opponent?.position?.x + left,
          y: opponent?.position?.y + top - scrollTop,
        },
      }
      setRenderOpponent(newOpponentCursor);
    }
  }, [scrollTop, opponent]);

  // Retrieve the stored code from session storage (e.g. when the user refreshes the page)
  useEffect(() => {
    const storedContent = sessionStorage.getItem(`codeEditorContent_${roomId}`);
    if (storedContent) {
      setCode(storedContent);
    }
  }, []);

  useEffect(() => {
    // Receive code changes from the server
    socket.on(Event.Collaboration.CODE_UPDATE, (updatedCode) => {
      if (updatedCode !== code) {
        setCode(updatedCode);
        sessionStorage.setItem(`codeEditorContent_${roomId}`, updatedCode);
      }
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
        setOpponent(data);
      }
    });

    // Receive mouse leave events from the server
    socket.on(Event.Collaboration.MOUSE_LEAVE, (data) => {
      if (data.jwt !== jwt) {
        setShowCursor(false);
      }
    });

  }, [socket]);

  // Hide the opponent's cursor after 5 seconds of inactivity
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
        <div className='col-sm-2'>
          <select
            className='form-select-sm'
            id='languageSelect'
            defaultValue={language}
            onChange={handleLanguageChange}
          >
            <option value='Python'>Python</option>
            <option value='Java'>Java</option>
            <option value='C++'>C++</option>
          </select>
        </div>
      </div>
      <div className='code-editor'
        onScroll={handleScroll}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        ref={editorBoxRef}
      >
        <div className='code-mirror' >
          <CodeMirror
            value={code}
            onChange={onChange}
            theme={vscodeDark}
            autoFocus={true}
            height='100vh'
            placeholder='Enter your code here...'
            extensions={[getLanguageExtension(language)]}
          />
          {isWithinWindow(renderOpponent.position, editorBoxRef) && showCursor &&
            <OverlayCursor opponent={renderOpponent} />}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
