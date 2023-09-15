import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import QuestionList from '../../components/QuestionList/QuestionList';
import QuestionDescription from '../../components/QuestionDescription/QuestionDescription';
import EditQuestion from '../../components/EditQuestion/EditQuestion';
import Header from '../../components/Header';
import './Landing.css';

function Landing() {
  return (
    <div className='landing'>
      <Header />
      <div className='body'>
        <Routes>
          <Route path='/' element={<QuestionList />} />
          <Route path='/question/:id' element={<QuestionDescription />} />
          <Route path='/edit/:id' element={<EditQuestion />} />
          <Route path='/new' element={<EditQuestion />} />
        </Routes>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Landing;
