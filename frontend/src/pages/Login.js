import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import Cookies from 'js-cookie';
import { login } from '../api/UserApi';
import { showSuccessToast } from '../utils/toast';
import { errorHandler } from '../utils/errors';
import { removeSessionStorage } from '../utils/helpers';
import welcomeImage from '../images/welcome.png';
import logoImage from '../images/logo.png';
import '../css/LoginSignup.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setEmail(location.state.email || email);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignupPageChange = () => {
    navigate('/signup', {state: { email, password }});
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

      navigate('/dashboard');
      showSuccessToast('User logged in successfully!');
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className='container'>
      <div className='row align-items-center'>
        <div className='col-12 col-md-6 d-flex flex-column d-none d-lg-block'>
          <div className='row d-flex'>
            <img className='welcome' src={welcomeImage} alt='Welcome' />
          </div>
          <div className='row'>
            <Typography
              variant='body1'
              className='text-center'
              style={{ fontStyle: 'italic' }}>
              <strong>Peerprep</strong>, your ultimate solution for mastering
              technical interviews through the power of collaboration
            </Typography>
          </div>
        </div>
        <div className='col-12 col-lg-6 d-flex flex-column align-items-center'>
          <div className='Auth-form-container'>
            <form className='Auth-form' onSubmit={handleLoginSubmit}>
              <div className='Auth-form-content'>
                <img
                  src={logoImage}
                  alt='Logo'
                  className='logo mx-auto d-block'
                />
                <h3 className='Auth-form-title'>Sign In</h3>
                <div className='text-center'>
                  Not registered yet?{' '}
                  <span
                    className='link-primary'
                    onClick={handleSignupPageChange}>
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
                    value={email}
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
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className='d-grid gap-2 mt-3'>
                  <button type='submit' className='btn btn-primary'>
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
