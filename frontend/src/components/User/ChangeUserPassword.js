import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { showValidationErrorToast, showServerErrorToast, showSuccessToast } from '../../utils/toast.js';
import { updatePassword } from '../../api/UserApi.js';

const ChangeUserPassword = ({ user }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const navigate = useNavigate();

  const handleUpdateClick = async (e) => {
    e.preventDefault();

    try {
      updatePassword(user.id, oldPassword, newPassword, confirmNewPassword);
      navigate(-1);
      showSuccessToast('Password updated successfully!');
    } catch (error) {
      if (error.response.status === 400) {
        showValidationErrorToast(error);
      } else {
        showServerErrorToast(error);
      }
    }
  };

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmNewPasswordChange = (event) => {
    setConfirmNewPassword(event.target.value);
  };

  return (
    <div className='container'>
      <h1>Change user password</h1>
      <p>Password must be at least 8 characters long.</p>
      <form className='change-user-password needs-validation' onSubmit={handleUpdateClick} noValidate>
        <div className='form-floating mb-3'>
          <input type='password' className='form-control' id='enterOldPassword' placeholder='Old Password' onChange={handleOldPasswordChange} required />
          <label htmlFor='enterOldPassword'>Old Password</label>
        </div>
        <div className='form-floating mb-3'>
          <input type='password' className='form-control' id='enterNewPassword' placeholder='New Password' onChange={handleNewPasswordChange} required />
          <label htmlFor='enterNewPassword'>New Password</label>
        </div>
        <div className='form-floating mb-3'>
          <input type='password' className='form-control' id='confirmNewPassword' placeholder='Confirm New Password' onChange={handleConfirmNewPasswordChange} required />
          <label htmlFor='confirmNewPassword'>Confirm New Password</label>
        </div>
        <div className='d-flex justify-content-end'>
          <button type='submit' className='btn btn-success'>
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangeUserPassword;
