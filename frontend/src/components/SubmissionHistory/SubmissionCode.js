import React, { useEffect, useState } from 'react';
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view"
import { EditorState } from "@codemirror/state"
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { javascript } from '@codemirror/lang-javascript';
import { parseDatetime } from '../../utils/helpers';
import { Language } from '../../constants';


const SubmissionCode = ({ attempt }) => {

  const [extensions, setExtensions] = useState([]);

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

  useEffect(() => {
    const languageExtension = getLanguageExtension(attempt.language);
    setExtensions([languageExtension, EditorView.editable.of(false),
      EditorState.readOnly.of(true), EditorView.lineWrapping]);
  }, [attempt]);

  return (
    <div>
      <CodeMirror
        value={attempt.code}
        extensions={extensions}
        height='90vh'
        theme={vscodeDark}
        options={{
          lineNumbers: true,
        }}
      />
      <div>
        <span className='m-3 '>Language: {attempt.language} |</span>
        <span>Submitted on: {parseDatetime(attempt.createdAt)}</span>
      </div>
    </div>
  );
}

export default SubmissionCode;
