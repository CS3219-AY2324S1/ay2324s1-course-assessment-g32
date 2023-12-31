import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../../components/Header';
import Spinner from '../../../components/Spinner';
import { ViewUserTopPane } from '../../../components/User';
import { updatePassword } from '../../../api/UserApi';
import { showSuccessToast } from '../../../utils/toast';
import { errorHandler } from '../../../utils/errors';
import { getCookie } from '../../../utils/helpers';
import { Container, Grid } from '@mui/material';

const ChangeUserPassword = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setUser(location.state.user);
      setIsLoading(false);
    } else {
      navigate(-1);
    }
  }, [location.state, navigate]);

  const handleUpdateClick = async (e) => {
    e.preventDefault();

    try {
      await updatePassword(
        user.id,
        currentPassword,
        newPassword,
        confirmPassword,
        getCookie()
      );
      // Redirect user back to the previous page (user-profile) if password is updated successfully
      navigate(-1);
      showSuccessToast('Password updated successfully!');
    } catch (error) {
      errorHandler(error);
    }
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

  const handleBackClick = () => {
    navigate('../');
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div>
      <Header />
      <div className='background'>
        <div className='main'>
          <Container sx={{ marginTop: '20px' }}>
            <Grid>
              <ViewUserTopPane user={user} />
              <div className='container'>
                <div className='row'>
                  <div className='col'>
                    <nav
                      aria-label='breadcrumb'
                      className='bg-light rounded-3 p-3 mb-4'>
                      <ol className='breadcrumb mb-0'>
                        <li
                          className='breadcrumb-item active'
                          aria-current='page'
                          style={{ fontWeight: 'bold' }}>
                          Change Password
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
                <form
                  className='change-user-password needs-validation'
                  onSubmit={handleUpdateClick}
                  noValidate>
                  <div className='form-floating mb-3'>
                    <input
                      type='password'
                      className='form-control'
                      id='enterCurrentPassword'
                      placeholder='Current Password'
                      onChange={handleCurrentPasswordChange}
                      required
                    />
                    <label htmlFor='enterCurrentPassword'>
                      Current Password
                    </label>
                  </div>
                  <div className='form-floating mb-3'>
                    <input
                      type='password'
                      className='form-control'
                      id='enterNewPassword'
                      placeholder='New Password'
                      onChange={handleNewPasswordChange}
                      required
                    />
                    <label htmlFor='enterNewPassword'>New Password</label>
                  </div>
                  <div className='form-floating mb-3'>
                    <input
                      type='password'
                      className='form-control'
                      id='confirmPassword'
                      placeholder='Confirm New Password'
                      onChange={handleConfirmPasswordChange}
                      required
                    />
                    <label htmlFor='confirmPassword'>
                      Confirm New Password
                    </label>
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
            </Grid>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default ChangeUserPassword;
