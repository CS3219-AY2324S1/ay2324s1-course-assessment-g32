import React, { useState } from 'react';

const CollapsibleOutput = ({ result }) => {
  const [isOutputCollapsed, setIsOutputCollapsed] = useState(false);

  const handleToggleOutputCollapse = () => {
    setIsOutputCollapsed(!isOutputCollapsed);
  };

  return (
    <>
      <button
        className='btn btn-secondary'
        onClick={handleToggleOutputCollapse}
      >
        <span style={{ float: 'left' }}>Result</span>
        <span style={{ float: 'right' }}>{isOutputCollapsed ? '▲' : '▼'}</span>
      </button>
      <div className={`collapse ${isOutputCollapsed ? '' : 'show'}`}>
        <textarea
          className='form-control'
          style={{ width: '100%', resize: 'none' }}
          rows='8'
          readOnly
          placeholder='Code execution results will appear here'
          value={result}
        />
      </div>
    </>
  );
};

export default CollapsibleOutput;
