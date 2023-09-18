import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { showValidationErrorToast, showServerErrorToast, showSuccessToast } from '../../utils/toast.js';
import { getUser, updateUsername } from '../../api/UserApi.js';

const EditUser = ({ user = null }) => {
  const [newUsername, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Used when routing from UserList
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userFetched = await getUser(id);
        setUsername(userFetched.username);
        setIsLoading(false);
      } catch (error) {
        navigate('../');
        if (error.response.status === 400) {
          showValidationErrorToast(error);
        } else {
          showServerErrorToast(error);
        }
      }
    };

    if (user) {
      setUsername(user.username);
      setIsLoading(false);
    } else {
      fetchData();
    }
  }, [id, navigate, user]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleUpdateClick = async (e) => {
    e.preventDefault();
    updateUsername(id, newUsername)
      .then(() => {
        navigate(-1);
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

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

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
                  <a href='/user-management'>User Management</a>
                </li>
              ) : null}
              <li className='breadcrumb-item active' aria-current='page' style={{ fontWeight: 'bold' }}>
                Edit User Information
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <form className='edit-username needs-validation' onSubmit={handleUpdateClick} noValidate>
        <div className='form-floating mb-3'>
          <input type='text' className='form-control' id='editUsername' placeholder='username' value={newUsername} onChange={handleUsernameChange} required />
          <label htmlFor='editUsername'>Username</label>
        </div>
        <div className='d-flex justify-content-between'>
          <button type='button' className='btn btn-secondary' onClick={handleBackClick}>
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
