import React from 'react';
import './LandingPage.css';
import QuestionList from '../components/QuestionList';
import QuestionDescription from '../components/QuestionDescription';
import logo from '../images/logo.png';
import { Route, Routes } from 'react-router-dom';

function LandingPage() {
  const divStyle = {
    backgroundColor: '#242323'
  };
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