import React from 'react';
import { Route, Routes } from 'react-router-dom';
import QuestionList from '../components/QuestionList/QuestionList';
import QuestionDescription from '../components/QuestionDescription/QuestionDescription';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page">
      <Routes>
        <Route path="/" element={<QuestionList />} />
        <Route path="/question/:id" element={<QuestionDescription />} />
      </Routes>
    </div>
  );
}

export default LandingPage;
