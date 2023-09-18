import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import QuestionList from '../components/QuestionList';
import QuestionDescription from '../components/QuestionDescription/QuestionDescription';
import EditQuestion from '../components/EditQuestion';
import CreateQuestion from '../components/CreateQuestion/CreateQuestion';
import './LandingPage.css';

function Landing() {
  return (
    <div className="landing">
      <Routes>
        <Route path="/" element={<QuestionList />} />
        <Route path="/question/:id" element={<QuestionDescription />} />
        <Route path="/edit/:id" element={<EditQuestion />} />
        <Route path="/new" element={<CreateQuestion />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default Landing;
