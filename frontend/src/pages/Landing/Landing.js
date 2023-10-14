import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import QuestionList from '../../components/Question/QuestionList';
import Question from '../../components/Question/Question/Question';
import CreateQuestion from '../../components/Question/CreateQuestion';
import EditQuestion from '../../components/Question/EditQuestion';
import Header from '../../components/Header';
import './Landing.css';


function Landing() {
  return (
    <div className='landing'>
      <Header />
      <div className='body'>
        <Routes>
          <Route path='/' element={<QuestionList />} />
          <Route path='/question/:id' element={<Question />} />
          <Route path='/edit/:id' element={<EditQuestion />} />
          <Route path='/new' element={<CreateQuestion />} />
        </Routes>
      </div>
    </div>
  );
}

export default Landing;
