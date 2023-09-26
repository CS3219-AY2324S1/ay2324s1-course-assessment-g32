import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import QuestionList from '../../components/Question/QuestionList';
import QuestionDescription from '../../components/Question/QuestionDescription/QuestionDescription';
import EditQuestion from '../../components/Question/EditQuestion';
import CreateQuestion from '../../components/Question/CreateQuestion/CreateQuestion';
import Header from '../../components/Header';
import './Landing.css';
import UserList from '../../components/User/UserList/UserList';

function Landing() {
  return (
    <div className='landing'>
      <Header />
      <div className='body'>
        <UserList />
      </div>
    </div>
  );
}

export default Landing;
