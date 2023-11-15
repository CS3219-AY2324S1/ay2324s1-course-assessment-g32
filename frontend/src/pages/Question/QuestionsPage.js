import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { QuestionList } from '../../components/Question';
import { QuestionDescription, EditQuestion, CreateQuestion } from './index';
import '../../css/QuestionsPage.css';

function QuestionsPage() {
  return (
    <div className='body'>
      <Routes>
        <Route path='/' element={<QuestionList />} />
        <Route path='/:id' element={<QuestionDescription />} />
        <Route path='/edit/:id' element={<EditQuestion />} />
        <Route path='/new' element={<CreateQuestion />} />
      </Routes>
    </div>
  );
}

export default QuestionsPage;
