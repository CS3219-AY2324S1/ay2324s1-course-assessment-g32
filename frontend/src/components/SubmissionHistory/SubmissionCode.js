import React, { useEffect, useState } from 'react';
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view"
import { EditorState } from "@codemirror/state"
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { parseDatetime } from '../../utils/helpers';


const SubmissionCode = ({ attempt }) => {

  const [extensions, setExtensions] = useState([]);

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
