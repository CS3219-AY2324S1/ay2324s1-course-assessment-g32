import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUsername } from '../../api/UserApi.js';
import { showSuccessToast } from '../../utils/toast.js';
import { errorHandler } from '../../utils/errors.js';

const EditUser = ({ user, isMaintainerPage }) => {
  const [id, setId] = useState('');
  const [newUsername, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setId(user.id);
    setUsername(user.username);
  }, [user]);

  const handleUpdateClick = async (e) => {
    e.preventDefault();

    try {
      await updateUsername(id, newUsername);
      navigate(-1);
      showSuccessToast('Username updated successfully!');
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleBackClick = () => {
    navigate('../');
  };

  return (
    <div className='container'>
      <div className='row' style={{ marginTop: '10px' }}>
        <div className='col'>
          <nav aria-label='breadcrumb' className='bg-light rounded-3 p-3 mb-4'>
            <ol className='breadcrumb mb-0'>
              {isMaintainerPage ? (
                <li className='breadcrumb-item'>
                  <a href='/users-management'>Manage User Profiles</a>
                </li>
              ) : null}
              <li
                className='breadcrumb-item active'
                aria-current='page'
                style={{ fontWeight: 'bold' }}>
                Edit User Information
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <form
        className='edit-username needs-validation'
        onSubmit={handleUpdateClick}
        noValidate>
        <div className='form-floating mb-3'>
          <input
            type='text'
            className='form-control'
            id='editUsername'
            placeholder='username'
            value={newUsername}
            onChange={handleUsernameChange}
            required
          />
          <label htmlFor='editUsername'>Username</label>
        </div>
        <div className='d-flex justify-content-between'>
          <button
            type='button'
            className='btn btn-secondary'
            onClick={handleBackClick}>
            Back
          </button>
          <button type='submit' className='btn btn-success'>
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
