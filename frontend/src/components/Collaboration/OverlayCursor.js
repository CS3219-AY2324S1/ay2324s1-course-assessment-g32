import React from 'react';
import cursor from '../../images/cursor.png';
import '../../css/OverlayCursor.css';

const OverlayCursor = ({ opponent }) => {
  const overlayStyle = {
    position: 'fixed',
    top: opponent.position.y,
    left: opponent.position.x,
    pointerEvents: 'none',
  };

  return (
    <div style={overlayStyle}>
      <img src={cursor} alt="cursor" className='cursor' />
      <div className='opponent-name'>{opponent.user}</div>
    </div>
  );
};

export default OverlayCursor;
