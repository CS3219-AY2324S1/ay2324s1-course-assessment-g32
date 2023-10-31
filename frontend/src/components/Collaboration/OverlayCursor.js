import React from 'react';
import cursor from '../../images/cursor.png';
import '../../css/OverlayCursor.css';

const OverlayCursor = ({ position }) => {
  const overlayStyle = {
    position: 'fixed',
    top: position.y,
    left: position.x,
    pointerEvents: 'none',
  };

  return (
    <div style={overlayStyle}>
      <img src={cursor} alt="cursor" className='cursor' />
    </div>
  );
};

export default OverlayCursor;
