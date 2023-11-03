import React from 'react';
import cursor from '../../images/cursor.png';
import '../../css/OverlayCursor.css';

const OverlayCursor = ({ partner }) => {
  const overlayStyle = {
    position: 'fixed',
    top: partner.position.y,
    left: partner.position.x,
    pointerEvents: 'none',
  };

  return (
    <div style={overlayStyle}>
      <img src={cursor} alt="cursor" className='cursor' />
      <div className='partner-name'>{partner.user}</div>
    </div>
  );
};

export default OverlayCursor;
