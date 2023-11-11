import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { signup } from '../api/UserApi';
import { showFailureToast, showSuccessToast } from '../utils/toast';
import { errorHandler } from '../utils/errors';
import logoImage from '../images/logo.png';
import '../css/LoginSignup.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setEmail(location.state.email || email);
    setPassword(location.state.password || password);
  }, []);

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
    navigate('/login', {state: { email }});
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
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
          <img src={logoImage} alt='Logo' className='logo mx-auto d-block' />
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
              autoComplete='new-password'
              className='form-control mt-1'
              placeholder='Enter password'
              value={password}
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
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>
          <div className='d-grid gap-2 mt-3'>
            <button type='submit' className='btn btn-primary'>
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
