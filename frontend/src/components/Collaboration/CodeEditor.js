import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { javascript } from '@codemirror/lang-javascript';
import { executeCode } from '../../api/ExecutionApi';
import { Language, Event } from '../../constants';
import { errorHandler } from '../../utils/errors';
import '../../css/CodeEditor.css';

const CodeEditor = ({ socket, roomId, selectedLanguage }) => {
  const [code, setCode] = useState('');
  const [result, setResult] = useState('');
  const [language, setLanguage] = useState(selectedLanguage);

  const getLanguageExtension = (selectedLanguage) => {
    switch (selectedLanguage) {
      case Language.PYTHON:
        return python();
      case Language.JAVA:
        return java();
      case Language.CPP:
        return cpp();
      case Language.JS:
        return javascript();
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

  const handleCodeExecution = async () => {
    try {
      const result = await executeCode(language, code);
      console.log(result)
      setResult(result);

      // Send execution results to the server
      socket.emit(Event.Collaboration.RESULT_CHANGE, {
        room: roomId,
        updatedResult: result,
      });
    } catch (err) {
      errorHandler(err);
    }
  };

  // Send code changes to the server
  useEffect(() => {
    const storedContent = sessionStorage.getItem(`codeEditorContent_${roomId}`);
    if (storedContent) {
      setCode(storedContent);
    }
  }, []);

  // Receive result update from the server
  useEffect(() => {
    socket.on(Event.Collaboration.RESULT_UPDATE, (updatedResult) => {
      setResult(updatedResult);
    });
  }, [result]);

  // Receive language changes from the server
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
            <option value='Javascript'>Javascript</option>
          </select>
          <button type='button' onClick={handleCodeExecution}>
            Run code
          </button>
        </div>
      </div>
      <div className='code-editor'>
        <CodeMirror
          className='h-full'
          value={code}
          onChange={onChange}
          autoFocus={true}
          height='100%'
          placeholder="print('Hello world')"
          extensions={[getLanguageExtension(language), EditorView.lineWrapping]}
        />
      </div>
      <div className='output-container'>
        <textarea
          className='form-control'
          rows='2'
          readOnly
          placeholder='Code execution results will appear here'
          value={result}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
