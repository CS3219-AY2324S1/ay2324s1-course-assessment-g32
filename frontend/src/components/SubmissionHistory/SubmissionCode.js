import React, { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { parseDatetime, getLanguageExtension } from '../../utils/helpers';
import CollapsibleOutput from '../Collaboration/CollapsibleOutput';
import '../../css/SubmissionCode.css';

const SubmissionCode = ({ attempt }) => {
  const [extensions, setExtensions] = useState([]);

  useEffect(() => {
    const languageExtension = getLanguageExtension(attempt.language);
    setExtensions([
      languageExtension,
      EditorView.editable.of(false),
      EditorState.readOnly.of(true),
      EditorView.lineWrapping,
    ]);
  }, [attempt]);

  return (
    <>
      <div className='submission-code-container'>
        <CodeMirror
          value={attempt.code}
          extensions={extensions}
          height='100%'
          theme={vscodeDark}
          options={{
            lineNumbers: true,
          }}
        />
      </div>
      <CollapsibleOutput result={attempt} />
      <div>
        <span>
          <strong>Language:</strong> {attempt.language} |{' '}
        </span>
        <span>
          <strong>Submitted on:</strong> {parseDatetime(attempt.createdAt)}
        </span>
      </div>
    </>
  );
};

export default SubmissionCode;
