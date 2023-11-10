import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { login } from '../api/UserApi';
import { showSuccessToast } from '../utils/toast';
import { errorHandler } from '../utils/errors';
import { removeSessionStorage } from '../utils/helpers';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignupPageChange = () => {
    navigate('/signup');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
      isMaintainer: true,
    };

    try {
      const response = await login(userData);
      removeSessionStorage();

      Cookies.set('jwt', response.data.token, {
        sameSite: 'Lax',
      });

      navigate('/landing');
      showSuccessToast('User logged in successfully!');
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className='Auth-form-container'>
      <form className='Auth-form' onSubmit={handleLoginSubmit}>
        <div className='Auth-form-content'>
          <h3 className='Auth-form-title'>Sign In</h3>
          <div className='text-center'>
            Not registered yet?{' '}
            <span className='link-primary' onClick={handleSignupPageChange}>
              Sign Up
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
              autoComplete='current-password'
              className='form-control mt-1'
              placeholder='Enter password'
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className='d-grid gap-2 mt-3'>
            <button
              type='submit'
              className='btn btn-primary'>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
