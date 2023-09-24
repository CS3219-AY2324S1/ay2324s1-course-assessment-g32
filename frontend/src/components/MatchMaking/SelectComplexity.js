import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../api/UserApi.js';
import { showSuccessToast } from '../../utils/toast.js';
import { errorHandler } from '../../utils/errors.js';

const SelectComplexity = () => {

  const navigate = useNavigate();

  const handleEasyClick = () => {
    navigate('./easy');
  }

  const handleMediumClick = () => {
    navigate('./medium');
  }

  const handleHardClick = () => {
    navigate('./hard');
  }

  return (
    <div className='container'>
      <div className='row' style={{ marginTop: '10px' }}>
        <button type='button' className='btn btn-success' onClick={handleEasyClick} >
          Easy
        </button>
        <button type='button' className='btn btn-warning' onClick={handleMediumClick} >
          Medium
        </button>
        <button type='button' className='btn btn-danger' onClick={handleHardClick} >
          Hard
        </button>
      </div>
    </div>
  );
}

export default SelectComplexity;
