import React, { useState, useEffect, useRef } from 'react';
import { basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap, indentWithTab } from '@codemirror/commands';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import './CodeEditor.css';

const CodeEditor = ({ socket, roomId }) => {
  const editor = useRef(null);
  const viewRef = useRef(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState(python());

  const onUpdate = EditorView.updateListener.of((update) => {
    if (update.docChanged) {
      const updatedCode = update.state.doc.toString();
      setCode(updatedCode);
    }
  });

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(getLanguageExtension(selectedLanguage));

    // Send language changes to the server
    socket.emit('languageChange', {
      room: roomId,
      updatedLanguage: selectedLanguage,
    });
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

  // Send code changes to the server
  useEffect(() => {
    socket.emit('codeChange', { room: roomId, updatedCode: code });
  }, [code, roomId, socket]);

  // Receive code changes from the server
  useEffect(() => {
    socket.on('codeUpdate', (updatedCode) => {
      if (viewRef.current) {
        viewRef.current.dispatch({
          // Replace the entire document with the updated code
          changes: {
            from: 0,
            to: viewRef.current.state.doc.length,
            insert: updatedCode,
          },
          // Preserve the user's cursor position
          selection: viewRef.current.state.selection,
        });
      }
    });
  }, []);

  // Receive language changes from the server
  useEffect(() => {
    socket.on('languageUpdate', (updatedLanguage) => {
      const languageSelect = document.getElementById('languageSelect');
      if (languageSelect) {
        languageSelect.value = updatedLanguage;
      }
      setLanguage(getLanguageExtension(updatedLanguage));
    });
  }, []);

  useEffect(() => {
    const state = EditorState.create({
      doc: code,
      extensions: [
        basicSetup,
        keymap.of([...defaultKeymap, indentWithTab]),
        onUpdate,
        language,
      ],
    });

    const view = new EditorView({ state, parent: editor.current });
    viewRef.current = view;

    return () => {
      view.destroy();
    };
  }, [language]);

  return (
    <div className="code-editor">
      <div className="row">
        <label for="languageSelect" className="col-sm-2">Language:</label>
        <div className="col-sm-2">
          <select
            className="form-select-sm"
            id="languageSelect"
            defaultValue={language}
            onChange={handleLanguageChange}
          >
            <option selected value="Python">Python</option>
            <option value="Java">Java</option>
            <option value="C++">C++</option>
          </select>
        </div>
      </div>
      <div className="editor-container">
        <div ref={editor}></div>
      </div>
    </div>
  );
};

export default CodeEditor;
