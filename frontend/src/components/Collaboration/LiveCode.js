import React, { useState, useEffect, useRef } from 'react';
import { basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap, indentWithTab } from '@codemirror/commands';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';

const CodeEditor = ({ socket, roomId }) => {
  const editor = useRef(null);
  const viewRef = useRef(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('Python');

  const onUpdate = EditorView.updateListener.of((update) => {
    if (update.docChanged) {
      const updatedCode = update.state.doc.toString();
      setCode(updatedCode);
    }
  });

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
  };

  const getLanguageExtension = (selectedLanguage) => {
    switch (selectedLanguage) {
      case 'Python':
        return python();
      case 'Java':
        return java();
      case 'C++':
        return cpp();
      default:
        return python();
    }
  };

  const changeSelectedOption = (selectedLanguage) => {
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
      languageSelect.value = selectedLanguage;
    }
  };

  // Send code changes to the server
  useEffect(() => {
    socket.emit('codeChange', { room: roomId, updatedCode: code });
  }, [code, roomId, socket]);

  // Receive code changes from the server
  useEffect(() => {
    socket.on('codeUpdate', (updatedCode) => {
      if (viewRef.current) {
        viewRef.current.dispatch({
          changes: {
            from: 0,
            to: viewRef.current.state.doc.length,
            insert: updatedCode,
          },
        });
      }
    });
  }, []);

  // Send language changes to the server
  useEffect(() => {
    socket.emit('languageChange', { room: roomId, updatedLanguage: language });
  }, [language, roomId, socket]);

  // Receive language changes from the server
  useEffect(() => {
    socket.on('languageUpdate', (updatedLanguage) => {
      setLanguage(updatedLanguage);
      changeSelectedOption(updatedLanguage);
    });
  }, []);

  useEffect(() => {
    const state = EditorState.create({
      doc: code,
      extensions: [
        basicSetup,
        keymap.of([...defaultKeymap, indentWithTab]),
        onUpdate,
        getLanguageExtension(language),
      ],
    });

    const view = new EditorView({ state, parent: editor.current });
    viewRef.current = view;

    return () => {
      view.destroy();
    };
  }, [language]);

  return (
    <div>
      <div>
        <label htmlFor="language">Language: </label>
        <select id="languageSelect" defaultValue={language} onChange={handleLanguageChange}>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
          <option value="C++">C++</option>
        </select>
      </div>
      <div ref={editor}></div>
    </div>
  );
};

export default CodeEditor;
