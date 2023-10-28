import React from 'react';
import { Route, Routes } from 'react-router-dom';
import QuestionList from '../../components/Question/QuestionList';
import QuestionDescription from './QuestionDescription';
import EditQuestion from './EditQuestion';
import CreateQuestion from './CreateQuestion';
import Header from '../../components/Header';
import './QuestionPage.css';

function QuestionPage() {
  return (
    <div className='landing'>
      <Header />
      <div className='body'>
        <Routes>
          <Route path='/' element={<QuestionList />} />
          <Route path='/:id' element={<QuestionDescription />} />
          <Route path='/edit/:id' element={<EditQuestion />} />
          <Route path='/new' element={<CreateQuestion />} />
        </Routes>
      </div>
    </div>
  );
}

export default QuestionPage;
