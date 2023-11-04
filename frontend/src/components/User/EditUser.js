import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateDisplayName } from '../../api/UserApi.js';
import { showSuccessToast } from '../../utils/toast.js';
import { errorHandler } from '../../utils/errors.js';
import { getCookie } from '../../utils/helpers.js';

const EditUser = ({ user, isMaintainerPage }) => {
  const [id, setId] = useState('');
  const [newDisplayName, setDisplayName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setId(user.id);
    setDisplayName(user.displayName);
  }, [user]);

  const handleUpdateClick = async (e) => {
    e.preventDefault();

    try {
      await updateDisplayName(id, newDisplayName, getCookie());
      navigate(-1);
      showSuccessToast('Display name updated successfully!');
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleDisplayNameChange = (event) => {
    setDisplayName(event.target.value);
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
        className='edit-display-name needs-validation'
        onSubmit={handleUpdateClick}
        noValidate>
        <div className='form-floating mb-3'>
          <input
            type='text'
            className='form-control'
            id='editDisplayName'
            placeholder='Display Name'
            value={newDisplayName}
            onChange={handleDisplayNameChange}
            required
          />
          <label htmlFor='editDisplayName'>Display Name</label>
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
