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

  useEffect(() => {
    switch (attempt.language) {
      case 'Python':
        setExtensions([python(), EditorView.editable.of(false), EditorState.readOnly.of(true)]);
        break;
      case 'Java':
        setExtensions([java(), EditorView.editable.of(false), EditorState.readOnly.of(true)]);
        break;
      case 'C++':
        setExtensions([cpp(), EditorView.editable.of(false), EditorState.readOnly.of(true)]);
        break;
      default:
        setExtensions([EditorView.editable.of(false), EditorState.readOnly.of(true)]);
    }
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
