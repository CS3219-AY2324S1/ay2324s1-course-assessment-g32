import React from 'react';

const OutputTextArea = ({ result }) => {
  return (
    <div className='output-container'>
      <textarea
        className='form-control'
        style={{ width: '100%', resize: 'none' }}
        rows='8'
        readOnly
        placeholder='Code execution results will appear here'
        value={result}
      />
    </div>
  );
};

export default OutputTextArea;
