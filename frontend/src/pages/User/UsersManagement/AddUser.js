import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { showSuccessToast } from '../../../utils/toast';
import { errorHandler } from '../../../utils/errors';
import { signup } from '../../../api/UserApi';
import Header from '../../../components/Header';

const AddUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleRegisterClick = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    try {
      await signup(userData);
      navigate('../');
      showSuccessToast('User created successfully!');
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleBackClick = () => {
    navigate('../');
  };

  return (
    <div>
      <Header />
      <div className='background'>
        <div className='main'>
          <div className='container'>
            <div className='row'>
              <div className='col'>
                <nav
                  aria-label='breadcrumb'
                  className='bg-light rounded-3 p-3 mb-4'>
                  <ol className='breadcrumb mb-0'>
                    <li className='breadcrumb-item'>
                      <a href='/users-management'>Manage User Profiles</a>
                    </li>
                    <li
                      className='breadcrumb-item active'
                      aria-current='page'
                      style={{ fontWeight: 'bold' }}>
                      Register New User
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
            <form
              className='change-user-password needs-validation'
              onSubmit={handleRegisterClick}
              noValidate>
              <div className='form-floating mb-3'>
                <input
                  type='text'
                  className='form-control'
                  id='enterEmail'
                  placeholder='Email'
                  onChange={handleEmailChange}
                  required
                />
                <label htmlFor='enterEmail'>Email</label>
              </div>
              <div className='form-floating mb-3'>
                <input
                  type='password'
                  className='form-control'
                  id='enterPassword'
                  placeholder='Password'
                  onChange={handlePasswordChange}
                  required
                />
                <label htmlFor='enterPassword'>Password</label>
              </div>
              <div className='form-floating mb-3'>
                <input
                  type='password'
                  className='form-control'
                  id='confirmPassword'
                  placeholder='Confirm Password'
                  onChange={handleConfirmPasswordChange}
                  required
                />
                <label htmlFor='confirmPassword'>Confirm Password</label>
              </div>
              <div className='d-flex justify-content-between'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={handleBackClick}>
                  Back
                </button>
                <button type='submit' className='btn btn-success'>
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
