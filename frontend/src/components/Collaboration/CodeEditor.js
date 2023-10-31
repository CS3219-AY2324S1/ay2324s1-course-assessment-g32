import React, { useState, useEffect, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { Language, Event } from '../../constants';
import OverlayCursor from './OverlayCursor';
import '../../css/CodeEditor.css';

const CodeEditor = ({ socket, roomId, selectedLanguage }) => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState(selectedLanguage);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scrollTop, setScrollTop] = useState(0);
  const [opponent, setOpponent] = useState({ x: 0, y: 0 });
  const [absoluteOpponent, setAbsoluteOpponent] = useState({ x: 0, y: 0 });
  const divisionRef = useRef(null);

  const isWithinWindow = (position) => {
    if (divisionRef.current) {
      const { x, y } = position;
      const { top, left, width, height } = divisionRef.current.getBoundingClientRect();
      if (x > left && x < left + width - 10 && y > top && y < top + height - 10) {
        return true;
      }
    }
    return false;
  }

  const broadcastMousePosition = () => {
    if (divisionRef.current) {
      const relativePosition = getRelativePosition();
      socket.emit(Event.Collaboration.MOUSE_POSITION, {
        room: roomId,
        user: 'hello',
        position: relativePosition,
      });
    }
  };



  const getAbsolutePosition = (relativePosition) => {
    if (divisionRef.current) {
      const { top, left } = divisionRef.current.getBoundingClientRect();
      return { x: relativePosition.x + left, y: relativePosition.y + top - scrollTop };
    }
  };

  const getRelativePosition = () => {
    if (divisionRef.current) {
      const { top, left } = divisionRef.current.getBoundingClientRect();
      return { x: position.x - left, y: position.y - top + scrollTop };
    }
  };

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
    broadcastMousePosition();
  };

  const handleScroll = (event) => {
    const { scrollTop } = event.target;
    setScrollTop(scrollTop);
    broadcastMousePosition();
  };

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

    // Send language changes to the server
    socket.emit(Event.Collaboration.LANGUAGE_CHANGE, {
      room: roomId,
      updatedLanguage: selectedLanguage,
    });
  };

  useEffect(() => {
    if (divisionRef.current) {
      const { top, left } = divisionRef.current.getBoundingClientRect();
      setAbsoluteOpponent({ x: opponent.x + left, y: opponent.y + top - scrollTop });
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
      }
    });
    // Receive language changes from the server
    socket.on(Event.Collaboration.LANGUAGE_UPDATE, (updatedLanguage) => {
      const languageSelect = document.getElementById('languageSelect');
      if (updatedLanguage !== languageSelect.value) {
        languageSelect.value = updatedLanguage;
        setLanguage(updatedLanguage);
      }
    });
    // Receive mouse position changes from the server
    socket.on(Event.Collaboration.MOUSE_POSITION, (data) => {
      setOpponent(data.position);
    });
  }, [socket]);

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
      <div className='code-editor' onScroll={handleScroll} onMouseMove={handleMouseMove} ref={divisionRef}  >
        <CodeMirror
          className='h-full'
          value={code}
          onChange={onChange}
          theme={vscodeDark}
          autoFocus={true}
          height='100%'
          placeholder='Enter your code here...'
          extensions={[getLanguageExtension(language)]}
        />
        {isWithinWindow(absoluteOpponent) && <OverlayCursor position={absoluteOpponent} className='h-full'/>}
      </div>
    </div>
  );
};

export default CodeEditor;
