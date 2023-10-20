import React from 'react';
import './SlidingPanel.css';

const SlidingPanel = ({ isOpen, onClose }) => {
  const handleOverlayClick = () => {
    onClose();
  };

  return (
    <div>
      {/* Overlay for darkening the background */}
      <div
        className={`overlay ${isOpen ? 'open' : ''}`}
        onClick={handleOverlayClick}
      />
      <div className={`sliding-panel ${isOpen ? 'open' : ''}`}>
        <div className='panel-content'>
          <div>CONTENT</div>
        </div>
      </div>
    </div>
  );
};

export default SlidingPanel;
