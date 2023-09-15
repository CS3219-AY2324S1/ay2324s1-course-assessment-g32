import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './TextEditor.css';

const TextEditor = ({ value, onChange }) => {
  return (
    <div class="quill-container">
      <ReactQuill
        placeholder='Description...'
        value={value}
        onChange={onChange}
        modules={{
          toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, 'bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image', 'video'],
            ['clean'],
          ],
        }}
      />
    </div>
  );
};

export default TextEditor;
