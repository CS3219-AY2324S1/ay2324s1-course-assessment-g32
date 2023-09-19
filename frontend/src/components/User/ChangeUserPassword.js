import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { showValidationErrorToast, showServerErrorToast, showSuccessToast } from '../../utils/toast.js';
import { updatePassword } from '../../api/UserApi.js';

const ChangeUserPassword = ({ user }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleUpdateClick = async (e) => {
    e.preventDefault();
    updatePassword(user.id, currentPassword, newPassword, confirmPassword)
      .then(() => {
        // Redirect user back to the previous page (user-profile) if password is updated successfully
        navigate(-1);
        showSuccessToast('Password updated successfully!');
      })
      .catch((error) => {
        if (error.response.status === 400) {
          showValidationErrorToast(error);
        } else {
          showServerErrorToast(error);
        }
      });
  };

  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <div className='container'>
      <div className='row' style={{ marginTop: '10px' }}>
        <div className='col'>
          <nav aria-label='breadcrumb' className='bg-light rounded-3 p-3 mb-4'>
            <ol className='breadcrumb mb-0'>
              <li className='breadcrumb-item active' aria-current='page' style={{ fontWeight: 'bold' }}>
                Change Password
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <p>Password must be at least 8 characters long.</p>
      <form className='change-user-password needs-validation' onSubmit={handleUpdateClick} noValidate>
        <div className='form-floating mb-3'>
          <input type='password' className='form-control' id='enterCurrentPassword' placeholder='Current Password' onChange={handleCurrentPasswordChange} required />
          <label htmlFor='enterCurrentPassword'>Current Password</label>
        </div>
        <div className='form-floating mb-3'>
          <input type='password' className='form-control' id='enterNewPassword' placeholder='New Password' onChange={handleNewPasswordChange} required />
          <label htmlFor='enterNewPassword'>New Password</label>
        </div>
        <div className='form-floating mb-3'>
          <input type='password' className='form-control' id='confirmPassword' placeholder='Confirm New Password' onChange={handleConfirmPasswordChange} required />
          <label htmlFor='confirmPassword'>Confirm New Password</label>
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
