import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import { QuestionList } from '../components/Question';
import { CreateQuestion, EditQuestion, QuestionDescription } from './Question';
import '../css/Landing.css';

function Landing() {
  return (
    <div className='landing'>
      <Header />
      <div className='body'>
        <Routes>
          <Route path='/' element={<QuestionList />} />
          <Route path='/question/:id' element={<QuestionDescription />} />
          <Route path='/edit/:id' element={<EditQuestion />} />
          <Route path='/new' element={<CreateQuestion />} />
        </Routes>
      </div>
    </div>
  );
}

export default Landing;
