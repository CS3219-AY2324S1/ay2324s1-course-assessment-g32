import React, { useState, useEffect } from 'react';

const LiveCode = ({ socket, roomId }) => {
  const [code, setCode] = useState('');

  useEffect(() => {
    socket.on('codeUpdate', (updatedCode) => {
      setCode(updatedCode);
    });
  }, []);

  const handleCodeChange = (e) => {
    const updatedCode = e.target.value;
    setCode(updatedCode);
    socket.emit('codeChange', { room: roomId, updatedCode });
  };

  return (
    <div className="border p-5" style={{ width: '80%' }}>
      <h1>Code</h1>
      <textarea
        value={code}
        onChange={handleCodeChange}
        rows="10"
        style={{ width: '80%' }}
      ></textarea>
    </div>
  );
};

export default LiveCode;
