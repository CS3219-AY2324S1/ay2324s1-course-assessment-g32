import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updateUsername, updatePassword } from 'api/UserApi.js';
import { showValidationErrorToast, showServerErrorToast, showSuccessToast } from 'utils/toast.js';

const EditUser = ({ user = null }) => {
  const [id, setId] = useState(null);
  const [newUsername, setUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    if (user) {
      // Used when routing from ManageUserProfile
      setId(user.id);
      setUsername(user.username);
    } else {
      // Used when routing from ManageUserProfiles
      setId(location.state.id);
      setUsername(location.state.username);
    }
    setIsLoading(false);
  }, [location.state, user]);

  const handleUpdateUsernameClick = async (e) => {
    e.preventDefault();
    
    updateUsername(id, newUsername)
      .then(() => {
        showSuccessToast('Username updated successfully!');
      })
      .catch((error) => {
        if (error.response.status === 400) {
          showValidationErrorToast(error);
        } else {
          showServerErrorToast(error);
        }
      });
  };

  const handleUpdatePasswordClick = async (e) => {
    e.preventDefault();
    
    updatePassword(id, currentPassword, newPassword, confirmPassword)
      .then(() => {
        showSuccessToast('Username updated successfully!');
      })
      .catch((error) => {
        if (error.response.status === 400) {
          showValidationErrorToast(error);
        } else {
          showServerErrorToast(error);
        }
      });
  };

  const handleUsernameChange = (event) => { setUsername(event.target.value) };
  const handleCurPasswordChange = (event) => { setCurrentPassword(event.target.value) };
  const handleNewPasswordChange = (event) => { setNewPassword(event.target.value) };
  const handleCfmPasswordChange = (event) => { setConfirmPassword(event.target.value) };

  return isLoading ? (
    <div className='spinner-border text-primary' role='status'>
      <span className='visually-hidden'>Loading...</span>
    </div>
  ) : (
    <div className='container'>
      <div className='row' style={{ marginTop: '10px' }}>
        <div className='col'>
          <nav aria-label='breadcrumb' className='bg-light rounded-3 p-3 mb-4'>
            <ol className='breadcrumb mb-0'>
              {!user ? (
                <li className='breadcrumb-item'>
                  <a href='/'>Manage User Profiles</a>
                </li>
              ) : null}
              <li className='breadcrumb-item active' aria-current='page' style={{ fontWeight: 'bold' }}>
                Edit User Information
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <form className='edit-username needs-validation' onSubmit={handleUpdateUsernameClick} >
        Update Username:
        <div className='form-floating mb-3'>
          <input type='text' className='form-control' id='editUsername' placeholder='username' value={newUsername} onChange={handleUsernameChange} required />
          <label htmlFor='editUsername'>Username</label>
        </div>
        <div className='d-flex justify-content-end'>
          <button type='submit' className='btn btn-success'>
            Update Username
          </button>
        </div>
      </form>

      <form className='edit-password needs-validation' onSubmit={handleUpdatePasswordClick} >
        Update Password:
        <div className='form-floating mb-3'>
          <input type='text' className='form-control' id='current-password'  value={currentPassword} onChange={handleCurPasswordChange} required />
          <label htmlFor='current-password'>Current Password</label>
        </div>
        <div className='form-floating mb-3'>
          <input type='text' className='form-control' id='new-password'  value={newPassword} onChange={handleNewPasswordChange} required />
          <label htmlFor='new-password'>New Password</label>
        </div>
        <div className='form-floating mb-3'>
          <input type='text' className='form-control' id='confirm-password' value={confirmPassword} onChange={handleCfmPasswordChange} required />
          <label htmlFor='confirm-password'>Confirm New Password</label>
        </div>
        <div className='d-flex justify-content-end'>
          <button type='submit' className='btn btn-success'>
            Update Password
          </button>
        </div>
      </form>

    </div>
  );

};

export default EditUser;
