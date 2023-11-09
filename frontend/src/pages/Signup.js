import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/UserApi';
import { showFailureToast, showSuccessToast } from '../utils/toast';
import { errorHandler } from '../utils/errors';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleLoginPageChange = () => {
    navigate('/login');
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (password != confirmPassword) {
      showFailureToast('Password are mismatched');
      return;
    }

    const userData = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    try {
      await signup(userData);
      navigate('/login');
      showSuccessToast('User created successfully!');
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className='Auth-form-container'>
      <form className='Auth-form' onSubmit={handleSignupSubmit}>
        <div className='Auth-form-content'>
          <h3 className='Auth-form-title'>Sign Up</h3>
          <div className='text-center'>
            Already registered?{' '}
            <span className='link-primary' onClick={handleLoginPageChange}>
              Sign In
            </span>
          </div>
          <div className='form-group mt-3'>
            <label>Email address</label>
            <input
              type='email'
              autoComplete='email'
              className='form-control mt-1'
              placeholder='Enter email'
              onChange={handleEmailChange}
              autoFocus
              required
            />
          </div>
          <div className='form-group mt-3'>
            <label>Password</label>
            <input
              type='password'
              autoComplete='new-password'
              className='form-control mt-1'
              placeholder='Enter password'
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className='form-group mt-3'>
            <label>Confirm Password</label>
            <input
              type='password'
              autoComplete='new-password'
              className='form-control mt-1'
              placeholder='Enter password again'
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>
          <div className='d-grid gap-2 mt-3'>
            <button
              type='submit'
              className='btn btn-primary'>
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
